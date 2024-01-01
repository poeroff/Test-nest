import { IsBoolean, IsEmail , IsOptional, IsString, MinLength } from "class-validator";
import { IsEqualTo } from "src/decorators/match.decorator";
export class CreateAuthDto {
    @IsEmail()
    email : string

    @IsString()
    @MinLength(5,{message : "5글자 이상 입력해주세요"})
    Password : string


    @IsString()
    @IsEqualTo("Password")
    ConfirmPassword : string


    @IsBoolean()
    @IsOptional()
    privilege : boolean
}
