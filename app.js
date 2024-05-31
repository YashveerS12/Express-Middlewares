const express=require("express");
const app=express();
const ExpressError=require("./ExpressError");
//  app.use((req,res,next)=>{
    // console.log("Yashveer");
    // next();
//  });
const check=(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess")
    {
        next();
    }
    throw  new ExpressError(401,"DENIED");
}
app.get("/api",check,(req,res)=>{
    res.send("data yash");
})
app.use((err,req,res,next)=>{
    let {status=500,message="Some error occured"}=err;
    res.status(status).send(message);
})
 app.use((req,res,next)=>{
    req.time=new Date(Date.now()).toString();
     console.log(req.method,req.hostname,req.path,req.time);
     next();
 });
 app.use("/random",(req,res,next)=>{
    console.log("I am only for Random");
 });
//  app.use("/api",(req,res,next)=>{
    // let {token}=req.query;
    // if(token==="giveaccess")
    // {
        // next();
    // }
    // res.send("Denied");

//  })
//  api?token=giveaccess
// app.get("/api",(req,res)=>{
    // res.send("data");
// })
// 
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to admin is Forbidden");
})
app.get("/",(req,res)=>{
    res.send("Hii , I am here");
})
app.listen(8080,()=>{
    console.log("Server is listening");
})
app.use((req,res)=>{
    res.send("Page not found");
})
// Another way of checking api
