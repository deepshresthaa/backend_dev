const mongoose=require("mongoose")

const connectDb=()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(res=>{
    console.log("DB connected")
  })
  .catch(e=>{
    console.log("Db connection failed")
  })
}
module.exports=connectDb;