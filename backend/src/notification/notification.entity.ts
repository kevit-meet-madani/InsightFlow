import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';


@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {

    @PrimaryColumn()
      id:number;
  user: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: ['system', 'order', 'payment', 'shipment'],
    default: 'system',
  })
  type: string;

  @Column({ default: false })
  isRead: boolean;
}
