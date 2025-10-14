import { User } from 'src/users/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Notification extends BaseEntity {
    id: number;
    user: User;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
}
