import { z } from "zod";


export const creatAcademicFacultyValidationSchema = z.object({
  body:z.object({
    
  name: z
  .string()
  })
  
});
export const updateAcademicFacultyValidationSchema =z.object({
    body:z.object({
      
    name: z
    .string()
    })
    
  });
export const AcademicFacultyValidation = {
    creatAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
};
