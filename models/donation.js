const { url } = require('inspector');
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true,
    },
    receiver:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false
    }
},{
    timestamps:true
});

const Donation=mongoose.model("Donation",donationSchema);

module.exports = Donation;