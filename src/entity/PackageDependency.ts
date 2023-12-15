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

  @OneToOne(() => Dependency)
  @JoinColumn()
  dependency: Dependency;
}
