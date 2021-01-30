const mongoose =require("mongoose");
// const DB_URL = "mongodb://localhost:27017/user"
const pwd = require("./config").DB_PWD;
// const monogoURL = "mongodb://localhost/pr";
const monogoURL = `mongodb+srv://pr-user:${pwd}@peerreview.sjzj9.mongodb.net/prDb?retryWrites=true&w=majority`;

mongoose.connect(monogoURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDb connected");
}).catch(()=>{
    console.log("Mongodb error while connection");
})

const UserSchema = mongoose.Schema({
    name:String,
    phone:Number,
    email:String
})

UserModel = mongoose.model("guser",UserSchema);

module.exports.UserModel = UserModel;