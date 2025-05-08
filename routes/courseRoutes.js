const courseControllers=require('../controllers/courseControllers');
const express=require('express');
const router=express.Router();

router.get('/',courseControllers.getAllCourses)

router.get('/:id',courseControllers.getSingleCourseByID)

router.post('/',courseControllers.addNewCourse)

router.put('/:id',courseControllers.updateNewCourse)

router.delete('/:id',courseControllers.deleteNewCourse)

module.exports=router;

