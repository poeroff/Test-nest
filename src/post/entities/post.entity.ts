import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn, PrimaryColumn, ManyToOne, BeforeInsert, JoinColumn, JoinTable, OneToMany } from "typeorm"
import { Auth } from "../../auth/entities/auth.entity"
import { Seat } from "src/seat/entities/seat.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
 
    id : number



    @Column()
    Name : string

    @Column()
    Describe : string

    @Column()
    Place : string

    @Column()
    Image : string 

    @Column()
    Category : string ; 
    
    @CreateDateColumn()
    createdAt : Date;

    @OneToMany(() => Seat , (seat) => seat.post)
    seat : Seat



  
}
