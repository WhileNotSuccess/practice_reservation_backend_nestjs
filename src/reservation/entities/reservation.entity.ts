import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { User } from "src/user/entities/user.entity";
import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(['id,userId'])
export class Reservation {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Restaurant,(restaurant)=>restaurant.id)
    @JoinColumn({name:'restaurantId'})
    restaurantId:number
    @ManyToOne(()=>User,(user)=>user.id)
    @Column()
    userId:number
    @Column()
    date:Date
}
