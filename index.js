const express=require('express');
const port=8000;
const app=express();
const path=require('path');

app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, '/views'));

// use express router
app.use("/",require("./routes/index"));
app.listen(port,(err)=>{
    if(err){
        console.log("Error in running Express Server : "+err);
    }
    console.log("The express server is running on the port : "+port);
});