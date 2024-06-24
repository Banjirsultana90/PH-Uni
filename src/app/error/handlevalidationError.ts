import mongoose from 'mongoose';
import { TGenericerror, Terrorsource } from '../interface/error';
import { Error } from 'mongoose';



const handleValidationError=(err:mongoose.Error.ValidationError):TGenericerror=>{
   
    const errorSources:Terrorsource= Object.values(err.errors).map((val:mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{return{

        path:val?.path,
        message:val?.message

    }})

    const   stausCode=400
    return{
        stausCode,
        message:'validation error ',
        errorSources,
        
    }
}
export default handleValidationError