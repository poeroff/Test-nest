import { Expose } from "class-transformer";
enum Grade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
  }
export class Reservationdto {
    @Expose()
    seat_number : number;

    @Expose()
    grade : Grade

    @Expose()
    price: number

}




