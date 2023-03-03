import { User } from './user';
import { Client } from './client';
import { State } from './state';

export class ClientAddress {
    id: number;
    uuid: string;
    line1: string;
    line2: string;
    city: string;
    state: State;
    pincode: string;
    createdOn: Date;
    createdBy: User;
    client: Client;
}