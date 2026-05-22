declare namespace Express {
    export interface Request {
        users?: {
            id: number;
            nama: string | null;
            email: string | null;
            role: string | null;
        }
    }

    export interface Request {
        invoice?: {
            id: number;
            userId: number;
            clientNama: string;
            status: string;
            amount: number;
            date: Date;
            dueData: Date;
        }
    }

    export interface Request {
        client?: {
            id: number;
            nama: string | null;
            email: string | null;
            compay: string | null;
            phone: string | null;
            address: string | null
        }
    }
}