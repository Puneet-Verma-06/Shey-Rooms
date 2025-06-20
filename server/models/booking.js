const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    roomid: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    fromdate: {
        type: String,
        required: true,
    },
    todate: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Booked'
    }
}, {
    timestamps: true  
});

const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;
