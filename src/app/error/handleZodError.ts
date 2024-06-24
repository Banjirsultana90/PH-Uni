import { ZodError, ZodIssue } from "zod"
import { TGenericerror, Terrorsource } from "../interface/error"

const handleZodError=(err:ZodError):TGenericerror=>{
    const   stausCode=400
    const errorSources:Terrorsource=err.issues.map((issue:ZodIssue)=>{
      return {
        path :issue?.path[issue.path.length-1],
        message:issue.message
      }
    })
    const stack=err.stack
    return {

      stausCode,
      message:'zod vallidation error',
      errorSources,
     
    }


  }
  export default handleZodError