import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";



export function Serialze(dto : any){
    return UseInterceptors(new SerializeInterceptor(dto));
}


class SerializeInterceptor implements NestInterceptor{
    constructor(private dto : any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data : any) =>{
                return plainToClass(this.dto, data ,{ excludeExtraneousValues : true}) //excludeExtraneousValues: true :  DTO에 정의되지 않은 속성을 무시하도록 지정
                
            })
        )
        
    }
}