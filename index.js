//console.log('start');

//import area
//const something = require('somelibrary');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());    
require('dotenv').config();

async function main(){
   
    //every function return somthing  
   return await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.bmcybml.mongodb.net/?retryWrites=true&w=majority`)
}
 main().then((d)=>{
    console.log('connect')
    //Lets define the schema 
    //const ClassName = mongoose.model(CollectionName,SchemeDefination);
    const Friends = mongoose.model('Friends',{
        name:String,
        surname:String
    })

    //app.method(routname,mdw1.mdw2,...,cbfn);
    app.post('/friends',(req,res)=>{
       
        console.log(req.body);

        //2. Create an oject from the class
        //let object = new ClassName();
        let friendObject = new Friends(req.body);

        //po.then()catch().finally()
        friendObject.save().then((d)=>{
            res.status(201).json({
                msg:'ohkk'
            })
        }).catch((e)=>{
            res.status(500).json({
                msg:'error'
            })
        })
    }); 
 }).catch((e)=>{
    console.log('error')
 })



let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('listening on port '+port);
})