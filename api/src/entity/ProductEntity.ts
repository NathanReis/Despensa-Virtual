import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbProducts")
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  brand: string;
}
