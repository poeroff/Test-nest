import { IsDate, IsNumber, IsString } from "class-validator"
export class CreateOpentimeDto {


    @IsString()
    OpenDate : string

    @IsString()
    OpenTime : string

    @IsNumber()
    postId : Number

    
}
