import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Vehiculo {
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column()
    placa!: string;
}
