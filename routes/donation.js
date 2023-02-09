const express=require("express");
const router=express.Router();
const passport=require("passport");

const donationsController=require("../controllers/donation_controllers");


router.get("/d",donationsController.donation_amount);
router.post("/create",donationsController.create_donation);
module.exports=router;