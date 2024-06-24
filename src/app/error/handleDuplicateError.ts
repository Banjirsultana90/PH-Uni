import mongoose from 'mongoose';
import { TGenericerror, Terrorsource } from '../interface/error';
import { Error } from 'mongoose';



const handleDuplicateErrorr=(err:any):TGenericerror=>{
   
    // Extract the value inside the curly braces
    const regex = /{ name: "(.*?)" }/;
    const match =err.message.match(regex);
    const ExtractedMessage=match && match[1]
    const errorSources:Terrorsource= [
        {
            path:'',
            message:`${ExtractedMessage} is already exist`
        }
    ]
     



    const   stausCode=400
    return{
        stausCode,
        message:'duplicate validation error',
        errorSources,
        
    }
}
export default handleDuplicateErrorr