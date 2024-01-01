import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn, PrimaryColumn, ManyToOne, BeforeInsert, JoinColumn, JoinTable } from "typeorm"
import { Auth } from "../../auth/entities/auth.entity"

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



  
}
