import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export class User {
    @OneToMany(()=>Reservation,(reservation)=>reservation.userId)
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    googleId:string
    @Column()
    phone:string
}
