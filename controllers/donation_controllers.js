const Donation = require("../models/donation");
const User= require("../models/user");

module.exports.donation_amount= async (req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/");
    }
    let receiver = await User.findById(req.query.id);

    await console.log(receiver);
    return res.render('donation',{
        title:"Donation Page",
        receiver:receiver
    })
}

module.exports.create_donation=(req,res)=>{
    Donation.create({
        sender:req.body.sender,
        receiver:req.body.receiver,
        currency:"$",
        amount:req.body.amount,
        name:req.body.name,
        message:req.body.message
    },(err,donation)=>{
        if(err){
            console.log("Error creating donation");
            return;
        }
        console.log("****************",donation);
    })

    return res.redirect("/users/profile");
}