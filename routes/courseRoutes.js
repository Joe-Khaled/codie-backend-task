const courseControllers=require('../controllers/courseControllers');
const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');

const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
            cb(null,'uploads');
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        cb(null, file.originalname.split('.')[0]+'-'+Date.now().toString().substring(9)+'.'+ext);
    }
})
const fileFilter=(req,file,cb)=>{
    const imageType=file.mimetype.split('/')[0];
    if(imageType==="image")
            cb(null,true);
    else 
            cb(appError.create("File must be an image file",401),false);
}
const upload=multer({storage:diskStorage,fileFilter});

router.get('/',courseControllers.getAllCourses)

router.get('/:id',courseControllers.getSingleCourseByID)

router.post('/',upload.single('image'),courseControllers.addNewCourse)

router.put('/:id',upload.single('image'),courseControllers.updateNewCourse)

router.delete('/:id',courseControllers.deleteNewCourse)

module.exports=router;

