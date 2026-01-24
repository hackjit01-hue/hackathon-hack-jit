import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import xlsx from 'xlsx';
import nodemailer from 'nodemailer';
import { db } from './firebase.js';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    getDoc,
    orderBy,
    limit,
    serverTimestamp
} from 'firebase/firestore';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add a Health Check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'live', time: new Date().toISOString() });
});

// Check if email credentials are configured
const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

let transporter = null;
if (emailConfigured) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Verify mail configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Mail Server Error:', error.message);
        } else {
            console.log('✅ Mail Server is ready');
        }
    });
} else {
    console.log('⚠️ Email not configured - EMAIL_USER and EMAIL_PASS missing in .env');
}

const sendTeamEmail = async (candidate, type) => {
    // Skip if email not configured
    if (!transporter) {
        console.log(`⚠️ Skipping email (${type}) - email not configured`);
        return;
    }

    const recipients = [candidate.leader.email, candidate.member.email];
    const isVerified = type === 'Verified';

    const subject = isVerified ? `Registration Verified! - ${candidate.teamName}` : `Registration Received - ${candidate.teamName}`;
    const headerColor = isVerified ? '#16a34a' : '#002e73';
    const statusText = isVerified ? 'Verified' : 'Pending Verification';

    const mailOptions = {
        from: `"Hackathon Team" <${process.env.EMAIL_USER}>`,
        to: recipients.join(', '),
        subject: subject,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; padding-bottom: 20px;">
                    <h2 style="color: ${headerColor}; margin: 0;">Team Registration ${isVerified ? 'Verified' : 'Successfully Received'}!</h2>
                </div>
                <p>Hello Team <strong>${candidate.teamName}</strong>,</p>
                <p>Registration details for <strong>${candidate.leader.name}</strong> and <strong>${candidate.member.name}</strong> have been ${isVerified ? 'successfully verified' : 'received and are now under verification'}.</p>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
                    <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: ${headerColor}; font-weight: bold;">${statusText}</span></p>
                    <p style="margin: 5px 0;"><strong>Total Fee:</strong> ₹${candidate.totalFee}</p>
                    <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${candidate.transactionId}</p>
                </div>

                ${!isVerified ? `
                <div style="background: #fffbeb; padding: 15px; border-radius: 8px; border: 1px solid #fef3c7; color: #92400e; font-size: 14px;">
                    <strong>Next Steps:</strong> Our team is currently verifying your payment. You will receive another email once the verification is complete.
                </div>
                ` : `
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #dcfce7; color: #166534; font-size: 14px;">
                    <strong>Congratulations!</strong> Your registration is now officially confirmed. We look forward to seeing your team at the hackathon.
                </div>
                `}

                <p style="margin-top: 30px;">Best Regards,<br/><strong>Team Hack@JIT</strong></p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 12px; color: #64748b; text-align: center;">This is an automated message. Please do not reply to this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email (${type}) sent to team ${candidate.teamName}`);
    } catch (error) {
        console.error('Email failed:', error);
    }
};


app.post('/api/register', async (req, res) => {
    console.log('Registration request received:', req.body.teamName);
    try {
        console.log('Checking slot count...');
        const candidatesRef = collection(db, "candidates");
        const snapshot = await getDocs(candidatesRef);
        const count = snapshot.size;

        console.log('Current count:', count);
        if (count >= 50) return res.status(400).json({ error: 'Slots Full' });

        // Check for duplicate team name
        const q = query(candidatesRef, where("teamName", "==", req.body.teamName));
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
            return res.status(400).json({ error: 'Team Name already exists' });
        }

        console.log('Saving candidate to Firestore...');

        // Add timestamp and status
        const candidateData = {
            ...req.body,
            status: 'Pending',
            registrationDate: new Date().toISOString(), // Store as string for easy serialization
            createdAt: serverTimestamp()
        };

        await addDoc(candidatesRef, candidateData);
        console.log('Candidate saved successfully');

        console.log('Sending email...');
        // We use the data we just created for the email
        sendTeamEmail(candidateData, 'Confirmation');

        console.log('Sending success response');
        res.status(201).json({ message: 'Success! Confirmation email sent to both members.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

const auth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password === process.env.ADMIN_PASSWORD || password === process.env.COORDINATOR_PASSWORD) next();
    else res.status(401).json({ error: 'Unauthorized' });
};

app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) res.json({ success: true, role: 'admin', token: password });
    else if (password === process.env.COORDINATOR_PASSWORD) res.json({ success: true, role: 'coordinator', token: password });
    else res.status(401).json({ success: false });
});

app.patch('/api/candidates/:id/status', auth, async (req, res) => {
    try {
        const candidateRef = doc(db, "candidates", req.params.id);

        await updateDoc(candidateRef, {
            status: req.body.status
        });

        // Fetch updated doc for email
        const docSnap = await getDoc(candidateRef);
        const candidate = docSnap.data();

        if (req.body.status === 'Verified') sendTeamEmail(candidate, 'Verified');

        res.json({ success: true, candidate: { id: docSnap.id, ...candidate } });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

app.get('/api/candidates/export', auth, async (req, res) => {
    try {
        console.log('Exporting candidates...');
        const q = query(collection(db, "candidates"), orderBy("registrationDate", "desc"));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(`Found ${data.length} candidates for export.`);

        const flat = data.map(c => {
            const leader = c.leader || {};
            const member = c.member || {};
            const mentor = c.mentor || {};

            return {
                'Team Name': c.teamName || 'N/A',
                'Leader Name': leader.name || 'N/A',
                'Leader Phone': leader.phone || 'N/A',
                'Leader Email': leader.email || 'N/A',
                'Leader College': leader.college || 'N/A',
                'Leader Dept': leader.dept || 'N/A',
                'Member Name': member.name || 'N/A',
                'Member Phone': member.phone || 'N/A',
                'Member Email': member.email || 'N/A',
                'Member College': member.college || 'N/A',
                'Member Dept': member.dept || 'N/A',
                'College District': c.collegeDistrict || 'N/A',
                'Status': c.status || 'Pending',
                'Fee Paid': c.totalFee || 0,
                'Transaction ID': c.transactionId || 'N/A',
                'Registration Date': c.registrationDate ? new Date(c.registrationDate).toLocaleString() : 'N/A',
                'Food Preference': c.foodPreference || 'N/A',
                'Referred By': c.referredBy || 'N/A',
                'Leader Gender': leader.gender || 'Not Provided',
                'Member Gender': member.gender || 'Not Provided',
                'Mentor Name': mentor.name || 'Not Provided',
                'Mentor Phone': mentor.phone || 'Not Provided',
                'Mentor Gender': mentor.gender || 'Not Provided',
                'Mentor Designation': mentor.designation || 'Not Provided',
                'Mentor Organization': mentor.organization || 'Not Provided'
            };
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(flat);
        xlsx.utils.book_append_sheet(wb, ws, 'Teams');

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Hackathon_Teams.xlsx');
        res.send(buffer);
        console.log('Export successful');
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to generate export' });
    }
});

app.get('/api/candidates/stats', auth, async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const allDocs = querySnapshot.docs.map(d => ({ _id: d.id, ...d.data() }));

        const count = allDocs.length;
        const verified = allDocs.filter(d => d.status === 'Verified').length;

        // Sort in memory since we already fetched all (hackathons rarely have >1000 teams, so this is fine)
        const recent = allDocs
            .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
            .slice(0, 10);

        res.json({ total: count, verified, recentlyAdded: recent });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(5001, () => console.log('Server on 5001'));
}

export default app;
