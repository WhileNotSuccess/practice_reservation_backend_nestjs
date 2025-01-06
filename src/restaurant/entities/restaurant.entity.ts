import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Restaurant {
    @OneToMany(
        (type)=>Reservation,
        (reservation)=>reservation.restaurantId
    )
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    thumbnail:string
    @Column('longtext')
    content:string
}
