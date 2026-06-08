import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Vehiculo {
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column()
    placa!: string;

    @Column()
    marca!: string;

    @Column()
    modelo!: string;

    @Column()
    color!: string;

    @Column()
    anio!: number;

    @Column()
}