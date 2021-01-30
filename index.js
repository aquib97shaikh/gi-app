const express = require("express");
const {UserModel} = require("./UserModel");
const cors = require("cors");
const PORT = process.env.PORT || 9999;
const app = express();
app.use(cors({
  "origin": "*",
}));
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.url,req.method,req.body);
    next();
})
app.post("/login",async (req,res)=>{
    console.log(req.body);
    try {
      const user = await UserModel.find({ phone: req.body.mobile });
      console.log(user.length);
      if (user.length > 0) {
        res.send({ success: true ,user});
      } else {
        res.status(400).send({ success: false });
      }
    } catch {
      res.status(400).send({ success: false });
    }
    
})

app.post("/signup",async (req,res)=>{
    const {mobile,name,email} = req.body;
    try{
        const user =  await UserModel.find({phone:mobile});
        console.log({user});
       if(user.length===0){
        const user =  new UserModel({phone:mobile,name,email});
        await user.save();
         res.send({success:true})
       }
       else{
           res.status(400).send({success:false,msg:"User already exists with same phone number!"});
       }
        

     }
     catch(err){
         console.error(err);
         res.status(400).send({success:false});
     }
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})