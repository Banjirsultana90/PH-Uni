import { TAcademicSemisternameCodemapper, TacademicSemisterCode, TacademicSemisterName, Tmonths } from "./academicSemister.interface";

export const Months: Tmonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  export const AcademicSemisterName:TacademicSemisterName[]=[
    'Autumn','Fall','Summer'
  ]
  export const AcademicSemisterCode:TacademicSemisterCode[]=[
    '01','02','03'
  ]
  export const academicSemisterNameCodeMapper:TAcademicSemisternameCodemapper={

        Autumn:'01',
        Summer:'02',
        Fall:'03'
    }