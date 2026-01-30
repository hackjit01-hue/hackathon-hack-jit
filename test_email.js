import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log(`Checking connection for: ${process.env.EMAIL_USER}`);
console.log(`Password length: ${process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0}`);

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Connection Failed:', error);
    } else {
        console.log('✅ Connection Successful! The credentials are correct.');
    }
    process.exit();
});
