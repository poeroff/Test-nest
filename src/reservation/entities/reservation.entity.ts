import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Auth } from "src/auth/entities/auth.entity";
import { Post } from "src/post/entities/post.entity";
import { Seat } from "src/seat/entities/seat.entity";
enum Grade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
  }
  
@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    seatId : number
    
    @Column()
    userId : number

    @Column()
    postId : number


    @ManyToOne((type)=> Auth, user => user.id, { eager: true })
    user : Auth;
    
    @ManyToOne((type)=> Post, post => post.id, { eager: true })
    post : Post;

    @OneToOne((type)=> Seat)
    @JoinColumn()
    seat : Seat;
}
