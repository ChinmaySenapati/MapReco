import { User } from './user';

export class DocumentType {
    id: number;
    uuid: string;
    name: string;
    code: string;
    createdOn: Date;
    createdBy: User;
    active: boolean;
}