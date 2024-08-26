export interface Customer {
    firstName: string;
    lastName: string;
}

export interface Reservation {
    id: number;
    businessDate: string
    status: 'CONFIRMED' | 'SEATED' | 'CHECKED OUT' | 'NOT CONFIRMED';
    shift: 'BREAKFAST' | 'LUNCH' | 'DINNER';
    start: string;
    end: string;
    quantity: number;
    customer: Customer;
    area: string;
    guestNotes: string;
}