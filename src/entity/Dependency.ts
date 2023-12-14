import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';

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

  @Column()
  name: string;

  @Column('simple-array')
  osTypesSupported: string[];

  @TreeChildren()
  children: Dependency[];

  @TreeParent()
  parent: Dependency;
}
