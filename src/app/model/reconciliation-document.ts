import { User } from './user';
import { Reconciliation } from './reconciliation';

export class ReconciliationDocument {
    id: number;
    uuid: string;
    documentType: DocumentType;
    name: string;
    uploadedOn: Date;
    uploadedBy: User;
    reconciliation: Reconciliation;
}