const express=require('express');
const app=express();
const path=require("path");

const collection=require("./mongodb");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'templates','login.html'));
})
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,'templates','signup.html'));
})
app.post("/login",async(req,res)=>{
    try{
    const data=await collection.findOne({name:req.body.name})
    if(data.password===req.body.password)
    {
        res.sendFile(path.join(__dirname,'templates','home.html'))
    }
    else{
        res.send("Password Incorrect")
    }
    }
    catch{
        res.send("User not found:Wrong details")
    }

})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password

    }
    await collection.insertMany([data])
    res.sendFile(path.join(__dirname,'templates','home.html'));

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})