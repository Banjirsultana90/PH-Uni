import { Router } from "express";
import { userRoutes } from "../../modules/user/users.routes";
import { StudentRoutes } from "../../modules/students/students.routes";
import { academicSemisterRoutes } from "../../modules/academicSemister/academicSemister.routes";
import { academicFacultyrRoutes } from "../../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../../modules/academicDepartment/academicDepartment.routes";
import { CourseRoutes } from "../../modules/courses.routes";

const router=Router()
const moduleRoutes=[
    {
        path:'/users',
        route:userRoutes

},
{
    path:'/students',
    route:StudentRoutes

},

{
    path:'/academic-semister',
    route:academicSemisterRoutes

},
{
    path:'/academic-faculty',
    route:academicFacultyrRoutes

},
{
    path:'/academic-department',
    route:AcademicDepartmentRoutes

},
{
    path:'/courses',
    route:CourseRoutes

},
]
moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

// router.use('/users',userRoutes)
// router.use('/students',StudentRoutes)

export default router