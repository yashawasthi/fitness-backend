const express=require("express");
const mongoose=require("mongoose");
const Entry=require("./entry.model.js");
const cors= require("cors");
require('dotenv').config({
    path:"./config.env"
  });
  

const app=express();

app.use(express.json());
app.use(cors());

(async function connectDB(){
    try {
        console.log(process.env.MONGO_URL)
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
  })();


   app.get('/', (req, res) => {
    res.send('Hello, my dear world!');
   });
   
   app.get('/entries', async (req, res) => {
       try {
           const data = await Entry.find({})
       
           if (data) {
             return res.status(200).json({
               msg: "Ok",
               data,
             });
           }
       
           return res.status(404).json({
             msg: "Not Found",
           });
         } catch (error) {
           return res.status(500).json({
             msg: error.message,
           });
         }
      });
   
   
   
    app.post('/saveEntry',async (req, res) => {
       try {
         console.log(req.body.date )
         console.log(req.body.weight )

         const { date,weight } = req.body;
         const newEntry=new Entry({date,weight});
         const data = await newEntry.save();
   
         return res.status(200).json({
           msg: "Ok",
           data,
         });
       } catch (error) {
         return res.status(500).json({
           msg: error.message,
         });
       }
     })
   
      
      
   app.route("/users").get((req, res,next) => {
       res.status(200).json({
           users:[],
           success:false,
       });
   });
   
   const port=process.env.PORT || 3000
   
   app.listen(port, () => {
    console.log(`App listening at port ${port}`);
   });