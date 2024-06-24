import mongoose from 'mongoose';
import { TGenericerror, Terrorsource } from '../interface/error';
import { Error } from 'mongoose';



const handleCastError=(err:mongoose.Error.CastError):TGenericerror=>{
   
    const errorSources:Terrorsource= [
        {
            path:err.path,
            message:err.message
        }
    ]
     



    const   stausCode=400
    return{
        stausCode,
        message:'cast validation error',
        errorSources,
        
    }
}
export default handleCastError