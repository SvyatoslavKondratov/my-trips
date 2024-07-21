export enum TripStatus {
	todo = 'todo',
	done = 'done',
	all = 'all',
}

export type Itinerary = {
	day: number;
	location: string;
	description: string;
};

export type TripType = {
	id: number;
	title: string;
	description: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	photo_url: string;
	status: TripStatus;
	itinerary: Itinerary[];
	key: number;
};
