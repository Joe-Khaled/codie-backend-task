require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const httpStatusText=require('./utils/httpStatusText')
const courseRoutes=require('./routes/courseRoutes');
const cors=require('cors');
const path=require('path');
const url=process.env.MONGO_URL;
mongoose.connect(url).then(()=>{
    console.log('Database connected successfully');
}).catch((err)=>{
    console.log("Your error is:",err);
})

app.use(cors({
    origin:true,
    credentials: true
}));
app.use(express.json({limit:'32mb'}));

app.use(express.urlencoded({ limit:'32mb',extended: true }));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/courses',courseRoutes);

app.listen(process.env.PORT,()=>{
    console.log('Your app running on port 3001');
});