import { User } from './user';
import { Message } from './message';
export interface Chat{
    id: string;
    users: Array<string>;
}