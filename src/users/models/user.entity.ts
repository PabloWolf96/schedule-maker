import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column({ default: false })
  isActive: boolean;
}
