import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  code: string; // Alpha-3 (COL, FRA, etc.)

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  subregion: string;

  @Column()
  capital: string;

  @Column()
  population: number;

  @Column()
  flagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
