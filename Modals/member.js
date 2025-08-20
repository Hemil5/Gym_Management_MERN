// const mongoose = require("mongoose");
import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    address: {
        type: String
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'membership',
        required: true
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    },
    profilePic: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "Active"
    },
    lastPayment: {
        type: Date,
        default: new Date()
    },
    nextBillDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export const memberModel = mongoose.model("member", memberSchema);

// module.exports = memberModel;