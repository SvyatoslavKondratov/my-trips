
export enum CardStatus {
    todo = 'todo',
    done = 'done',
}

export type Itinerary = {
    day: number;
    location: string;
    description: string;
}

export type AllTripsCardType = {
    id: number,
    title: string;
    description: string;
    photo_url: string;
    status: CardStatus;
    itinerary: Itinerary[];
    key: number;
}