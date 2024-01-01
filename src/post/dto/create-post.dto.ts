import { IsString , IsNumber, IsOptional } from "class-validator"
export class CreatePostDto {
    @IsString()
    Name : string

    @IsString()
    Describe : string

    @IsString()
    Place : string

    @IsString()
    @IsOptional()
    Image : string 

    @IsString()
    Category : string ; 



   
}
