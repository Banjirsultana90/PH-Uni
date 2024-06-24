export type Tmonths =
| "January"
| "February"
| "March"
| "April"
| "May"
| "June"
| "July"
| "August"
| "September"
| "October"
| "November"
| "December";


export type TacademicSemisterName =
    'Autumn'|'Fall'|'Summer'
export type TacademicSemisterCode='01'|'02'|'03'

export type Tacademicsemister={

    name:TacademicSemisterName
    code:TacademicSemisterCode,
    year:string,
    startmonth:Tmonths,
    endmonth:Tmonths

}

export type TAcademicSemisternameCodemapper=
{
    [ key:string]:string
}