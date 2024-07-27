/* eslint-disable n/file-extension-in-import */
import {type NextRequest, NextResponse} from 'next/server';
import {BASE_URL} from '../../../constants/urls';
import withCrossCutting from '../../apiRouteHandlers';
import {type TripType} from '@/app/types/card-types';

const deleteHandler = async (
	req: NextRequest,
	{params: {id}}: {params: {id: string}},
) => {
	await fetch(`${BASE_URL}/travels/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({id}),
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	return NextResponse.json(id);
};

const putHandler = async (
	req: NextRequest,
	{params: {id}}: {params: {id: string}},
) => {
	const trip = (await req.json()) as TripType;
	const response = await fetch(`${BASE_URL}/travels/${id}`, {
		method: 'PUT',
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(trip),
	});
	const data = (await response.json()) as TripType;

	return NextResponse.json(data);
};

export const DELETE = withCrossCutting(deleteHandler);
export const PUT = withCrossCutting(putHandler);
