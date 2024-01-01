import { Entity , Column, PrimaryGeneratedColumn, CreateDateColumn ,ManyToOne} from "typeorm";
import { Post } from "src/post/entities/post.entity";
@Entity()
export class Opentime {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    OpenDate : Date

    @Column()
    OpenTime : string

    @CreateDateColumn()
    createdAt : Date;

    @Column()
    postId : number


    @ManyToOne(()=> Post, Post => Post.opentime, { eager: true })
    post : Post;

}
