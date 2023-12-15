import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Package } from './Package';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Package, (pckg) => pckg.user)
  packages: Package[];

  @CreateDateColumn()
  createdAt: Date;
}
