import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';
import { PackageDependency } from './PackageDependency';

export enum OSType {
  LINUX = 'linux',
  WINDOWS = 'windows',
  MAC = 'mac',
}

@Entity()
@Tree('closure-table')
export class Dependency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  osTypesSupported: string[];

  @OneToMany(() => PackageDependency, (pckgDeps) => pckgDeps.package)
  packageDependencies: PackageDependency[];

  @TreeChildren()
  dependents: Dependency[];

  @TreeParent()
  dependentOf: Dependency;
}
