import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '@/entity/User';
import { PackageDependency } from '@/entity/PackageDependency';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => PackageDependency, (pckgDeps) => pckgDeps.package)
  directDependencies: PackageDependency[];

  @CreateDateColumn()
  createdAt: Date;
}
