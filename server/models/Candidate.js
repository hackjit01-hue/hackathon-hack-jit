import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    teamName: { type: String, unique: true, required: true },
    leader: {
        name: { type: String, required: true },
        phone: String,
        email: { type: String, required: true },
        college: String,
        dept: String,
        gender: String
    },
    member: {
        name: { type: String, required: true },
        phone: String,
        email: { type: String, required: true },
        college: String,
        dept: String,
        gender: String
    },
    collegeDistrict: String,
    collegePincode: String,
    expectedArrivalDate: String,
    expectedArrivalTime: String,
    requireAccommodation: String,
    accommodationDates: [String],
    totalFee: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },
    transactionId: { type: String, required: true },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    mentor: {
        name: String,
        phone: String,
        gender: String,
        designation: String,
        organization: String
    }
});

export default mongoose.model('Candidate', candidateSchema);
