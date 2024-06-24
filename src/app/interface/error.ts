
export type Terrorsource={
    message:string |number
    path:string
  }[]

  export type TGenericerror={
    stausCode:number,
    message:string
    errorSources:Terrorsource
    // stack:string
  }