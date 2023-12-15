import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.packages)
  @JoinColumn()
  user: User;

  @OneToMany(() => PackageDependency, (pckgDeps) => pckgDeps.package)
  directDependencies: PackageDependency[];

  @CreateDateColumn()
  createdAt: Date;
}
