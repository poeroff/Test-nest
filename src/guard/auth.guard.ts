import { CanActivate ,ExecutionContext,Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtservice : JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const authHeader  = request.headers['authorization']

        if(!authHeader){
            throw new UnauthorizedException("JWT토큰을 찾을수 없습니다")
        }
        let token : string;
        try{
            token = authHeader.split(" ")[1]
            const payload =  this.jwtservice.verify(token);
            request.user = payload;
            return true
        }catch(err){
            throw new UnauthorizedException("JWT토큰이 일치하지 않습니다")
           
        }
       
        
    }
}