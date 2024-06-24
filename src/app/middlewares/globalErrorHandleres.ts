import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Terrorsource } from "../interface/error";
import config from "../config";
import handleZodError from "../error/handleZodError";
import { ZodError } from "zod";
import handleValidationError from "../error/handlevalidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateErrorr from "../error/handleDuplicateError";

const globalErrorHndlader:ErrorRequestHandler=(err,req, res,next)=>{
    let stausCode=500;
    let message = err.message || 'Something went wrong!';
    // let stack=err.stack


    let errorSources:Terrorsource=[
      {
        path:'',
        message:'Something went wrong!'
      }
    ]

 
    if(err instanceof ZodError){

      const simplifiedError=handleZodError(err)
      stausCode=simplifiedError?.stausCode
      message=simplifiedError?.message
      errorSources=simplifiedError?.errorSources
    
      
    }else if(err?.name==='ValidationError'){
      const simplifiedError=handleValidationError(err)
      stausCode=simplifiedError?.stausCode
      message=simplifiedError?.message
      errorSources=simplifiedError?.errorSources

    }else if(err?.name==='CastError'){
      const simplifiedError=handleCastError(err)
      stausCode=simplifiedError?.stausCode
      message=simplifiedError?.message
      errorSources=simplifiedError?.errorSources

    }
    else if(err?.code===11000){
      const simplifiedError=handleDuplicateErrorr(err)
      stausCode=simplifiedError?.stausCode
      message=simplifiedError?.message
      errorSources=simplifiedError?.errorSources

    }
  
    return res.status(stausCode).json({
      success:false,
      message,
      errorSources,
      stack:config.NODE_ENV==='development' ?err.stack:null
      // error:err
    })
  }

  export default globalErrorHndlader