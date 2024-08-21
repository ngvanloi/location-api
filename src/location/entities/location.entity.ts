import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  locationName: string;

  @Column()
  locationNumber: string;

  @Column('decimal', { precision: 10, scale: 3 })
  area: number;

  @TreeChildren()
  children: Location[];

  @TreeParent()
  parent: Location;
}
