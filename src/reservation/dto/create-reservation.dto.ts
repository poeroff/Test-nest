import { IsEnum, IsNumber, IsString ,  } from "class-validator";
enum Grade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
  }
export class CreateReservationDto {
    @IsNumber()
    seat_number : number


    @IsEnum(Grade)
    grade : Grade



    @IsNumber()
    postId : number

    
}
