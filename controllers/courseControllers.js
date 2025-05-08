const express = require('express');
const router=express.Router();
const course = require('../models/courseModel');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const validation=require('../utils/PostAndPutValidation');
// GET - GET ALL COURSES
const getAllCourses=async(req,res)=>{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page || 1;
    const skip=(page-1)*limit;
    const courses=await course.find().limit(limit).skip(skip);
    res.status(200).json({status:httpStatusText.SUCCESS,data:{courses}});
}

//GET - SINGLE COURSE BY ID
const getSingleCourseByID=async(req,res)=>{
    const id=req.params.id;
    const myCourse=await course.findById(id);
    if(!myCourse){
        const err=appError.create("Course Not found",404,httpStatusText.FAIL);
        res.status(404).json(err);
        return;
    }
    res.status(200).json(myCourse);
}

//POST - ADD A NEW COURSE
const addNewCourse=async(req,res)=>{
    let {title,description,startDate,endDate,price}=req.body
    const image=req.file.path;
    // console.log(image);
    // return;
    price=Number(price);
    const dataValidation =validation(title,description,startDate,endDate,price);
    if (dataValidation){
        res.status(dataValidation.statusCode).json(dataValidation);
    }
    try{
        const newCourse=await course.create({   
            title,description,image,startDate,endDate,price
        })
        await newCourse.save();
        res.status(200).json({Status:httpStatusText.SUCCESS,Message:"Saved successfully"})
    }
    catch(err){
        const error=appError.create(err.message,400,httpStatusText.err);
        res.status(400).json(error);
    }
}

//PUT - UPDATE EXISTING COURSE
const updateNewCourse=async(req,res)=>{
    const id=req.params.id;
    let {title,description,image,startDate,endDate,price}=req.body
    const dataNotValid =validation(title,description,startDate,endDate,price);
    if (dataNotValid){
        res.status(dataNotValid.statusCode).json(dataNotValid);
    }
    try {
        const updateCourse=await course.updateOne({_id:id},{title,description,image,startDate,endDate,price})
        res.status(200).json({Status:httpStatusText.SUCCESS,Message:"Course was updated successfully"});
    } catch (err) {
        console.log(err);  
    }
}

//Delete course by id
const deleteNewCourse=async(req,res)=>{
    const id=req.params.id;
    try {
        const deletedCourse=await course.findOneAndDelete({_id:id});
        res.status(200).json({status:httpStatusText.SUCCESS,Message:"Course was deleted successfully",deletedCourse});
    } catch (err) {
        const failure=appError.create(err.message,400,httpStatusText.err);
        res.status(400).json(failure);
    }

}

module.exports={
    getAllCourses,
    getSingleCourseByID,
    addNewCourse,
    updateNewCourse,
    deleteNewCourse
};