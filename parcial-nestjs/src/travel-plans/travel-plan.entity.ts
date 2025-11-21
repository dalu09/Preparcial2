import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Country } from '../countries/country.entity';

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @ManyToOne(() => Country, { eager: true })
  country: Country;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;
}
