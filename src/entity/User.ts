import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userName: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: Date;
}
