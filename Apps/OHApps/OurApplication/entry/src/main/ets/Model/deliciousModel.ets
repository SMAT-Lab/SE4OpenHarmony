export class DeliciousModel {
  reason: string
  result:
     {
      curpage: number
      allnum: number
      list: Array<
        {
          id:number
          type_id:number
          type_name:string
          cp_name: string
          zuofa: string
          texing: string
          tishi: string
          tiaoliao: string
          yuanliao: string
          }>
      //  list: {
      //    id:number
      //        type_id:number
      //        type_name:string
      //        cp_name: string
      //        zuofa: string
      //        texing: string
      //        tishi: string
      //        tiaoliao: string
      //        yuanliao: string
      //  }
  }
  error_code: number
  }