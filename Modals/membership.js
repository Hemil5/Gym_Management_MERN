// const mongoose = require("mongoose");
import mongoose from "mongoose";

const MembershipSChema = mongoose.Schema({
    months:{
        type:Number,
        required:true,
    },
    price:{ 
        type:Number,
        required:true
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true
    }
},{timestamps:true})

export const modalMembership = mongoose.model("membership",MembershipSChema);

// module.exports = modalMembership;