const Joi=require('joi');
const appError=require('./appError');
const httpStatusText=require('./httpStatusText');
//Required validation handled from database level
const dataValidation=Joi.object({
    title:Joi.string().min(5).max(30),
    description:Joi.string().min(20).max(300)
})

const validation=(title,description,startDate,endDate,price)=>{
    const {error,value}=dataValidation.validate({title,description});
    if(error){
        const err=appError.create(error.message,400,httpStatusText.ERROR);
        return err;
    }
    startDate=new Date(startDate);endDate=new Date(endDate);
    let currentDate=new Date()
    if(startDate < currentDate || startDate > endDate || endDate < currentDate)
    {
        const failure=appError.create('Dates is invalid',400,httpStatusText.FAIL);
        return failure;
    }
    if(price < 1)
    {
        const failure=appError.create('Please check the price',400,httpStatusText.FAIL);
        return failure;
    }
}
module.exports=validation