import { User } from './user';
import { ClientAddress } from './client-address';

export class Client {
    id: number;
    uuid: string;
    name: string;
    code: string;
    createdOn: Date;
    createdBy: User;
    active: boolean;
    address: ClientAddress;
}