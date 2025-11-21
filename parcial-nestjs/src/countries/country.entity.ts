import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TravelPlan } from '../travel-plans/travel-plan.entity';

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

  @OneToMany(() => TravelPlan, (plan) => plan.country)
  travelPlans: TravelPlan[];
}
