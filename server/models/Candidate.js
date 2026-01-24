const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    teamName: { type: String, unique: true, required: true },
    leader: {
        name: { type: String, required: true },
        phone: String,
        email: { type: String, required: true },
        college: String,
        dept: String,
        // NEW FIELD - appended, optional for old records
        gender: String
    },
    member: {
        name: { type: String, required: true },
        phone: String,
        email: { type: String, required: true },
        college: String,
        dept: String,
        // NEW FIELD - appended, optional for old records
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
    // NEW SECTION - Mentor Details (completely optional)
    mentor: {
        name: String,
        phone: String,
        gender: String,
        designation: String,
        organization: String
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);
