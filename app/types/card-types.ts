export enum CardStatus {
	todo = 'todo',
	done = 'done',
	all = 'all',
}

export type Itinerary = {
	day: number;
	location: string;
	description: string;
};

export type AllTripsCardType = {
	id: number;
	title: string;
	description: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	photo_url: string;
	status: CardStatus;
	itinerary: Itinerary[];
	key: number;
};
