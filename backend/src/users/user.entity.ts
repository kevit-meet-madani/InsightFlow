import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  name: string;

  @Column({ unique: true , nullable:true})
  email: string;

  @Column({ select: false , nullable:true})
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'vendor', 'customer'],
    default: 'customer',
  })
  role: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
