import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn, PrimaryColumn, ManyToOne, BeforeInsert, JoinColumn, JoinTable, OneToMany } from "typeorm"
import { Reservation } from "src/reservation/entities/reservation.entity"
import { Seat } from "src/seat/entities/seat.entity"
import { Opentime } from "src/opentime/entities/opentime.entity"

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

    @OneToMany(() => Opentime , (opentiem) => opentiem.post)
    opentime : Opentime

    @OneToMany(() => Reservation , (reservation) => reservation.post)
    @JoinColumn()
    reservation : Reservation






  
}
