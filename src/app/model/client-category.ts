import { User } from './user';
import { Client } from './client';

export class ClientCategory {
    id: number;
    uuid: string;
    name: string;
    code: string;
    createdOn: Date;
    createdBy: User;
    client: Client;
}