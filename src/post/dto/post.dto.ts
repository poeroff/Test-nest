
import { Expose } from "class-transformer";
export class PostDto {

    @Expose()
    id : number
    @Expose()
    Name : string;
    @Expose()
    Describe : string
    @Expose()
    Place : string
    @Expose()
    Image:  string
    @Expose()
    Category : string
  
    

}