import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn , DeleteDateColumn, JoinTable} from 'typeorm';

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
 
    id : number

    @Column()
    email : string

    @Column()
    Password : string
    
    @Column({default: 10000})
    Point : number

    @Column({default : false})
    privilege : boolean

    @CreateDateColumn()
    createdAt : Date;
    
    @UpdateDateColumn()
    updatedAt : Date;

    @DeleteDateColumn()
    deletedAt? : Date

    @OneToMany(() => Reservation, reservation  => reservation.user)
    reservation : Reservation
}
