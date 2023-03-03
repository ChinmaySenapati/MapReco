import { Client } from './client';
import { User } from './user';
import { ClientCategory } from './client-category';

export class Partner {
    id: number;
    uuid: string;
    name: string;
    code: string;
    clientCategory: ClientCategory;
    creadtedOn: Date;
    creadtedBy: User;
    active: boolean;
}