import { Expose } from "class-transformer";
export class UserDto{
    @Expose()
    id : number 
    
    @Expose()
    email : string; 

    @Expose()
    point : number;
    
    @Expose()
    createdAt : Date

}