const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/LoginPage")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("mongodb connection failed")
})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1",LoginSchema);
module.exports=collection;