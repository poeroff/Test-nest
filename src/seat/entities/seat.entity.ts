import { Entity , PrimaryGeneratedColumn , Column, ManyToOne, JoinTable, OneToOne, JoinColumn} from "typeorm";
import { Post } from "src/post/entities/post.entity";



enum Grade {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
  }
@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    seat_number : number;

    @Column({
        type : "enum",
        enum : Grade
    })
    grade : Grade

    @Column()
    price : number;

    @Column()
    postId : number

    @Column()
    seat_use : boolean

  
    @ManyToOne(()=> Post, Post => Post.seat)
    post : Post;


    



}

