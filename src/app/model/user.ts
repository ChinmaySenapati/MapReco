import { Role } from './role';
import { Client } from './client';

export class User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    authToken: string;
    tokenExpiresOn: Date;
    createdOn: Date;
    createdBy: User;
    active: boolean;
    client: Client
    role: Role;
}