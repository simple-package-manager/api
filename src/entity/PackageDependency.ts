import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Package } from '@/entity/Package';
import { Dependency } from '@/entity/Dependency';

@Entity()
export class PackageDependency {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Package, (pckg) => pckg.directDependencies)
  package: Package;

  @ManyToOne(() => Dependency, (dependency) => dependency.packageDependencies)
  dependency: Dependency;
}
