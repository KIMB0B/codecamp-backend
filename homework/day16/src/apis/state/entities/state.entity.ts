import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  ID: number;
  @Column()
  STATE: string;
}
