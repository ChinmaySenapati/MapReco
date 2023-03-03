import { User } from './user';
import { Client } from './client';
import { Partner } from './partner';
import { Status } from './status';
import { ReconciliationDocument } from './reconciliation-document';

export class Reconciliation {
    id: number;
    uuid: string;
    client: Client;
    partner: Partner;
    fromDate: Date;
    toDate: Date;
    status: Status;
    active: boolean;
    uploadedOn: Date;
    uploadedBy: User;
    approvedOn: Date;
    approvedBy: User;
    documents: ReconciliationDocument[];
}