import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name:"registration"})

export class Registration{
    @PrimaryGeneratedColumn("increment")
    id!:number;

    @Column()
    firstname!:string

    @Column()
    lastname!:string

    @Column()
    password!:string

    @Column()
    email!:string

    @Column()
    gender!:string

    @Column()
    phonenumber!:string

    @Column()
    dateofbirth!:string

    @Column()
    country!:string
}