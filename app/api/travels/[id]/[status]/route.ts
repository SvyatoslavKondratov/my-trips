/* eslint-disable n/file-extension-in-import */
import {NextResponse, type NextRequest} from 'next/server';
import {BASE_URL} from '../../../../constants/urls';
import withCrossCutting from '../../../apiRouteHandlers';
import {type TripType, type TripStatus} from '@/app/types/card-types';

const patchHandler = async (
	req: NextRequest,
	{params: {id, status}}: {params: {id: string; status: TripStatus}},
) => {
	const response = await fetch(`${BASE_URL}/travels/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({status}),
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const data = (await response.json()) as TripType;
	return NextResponse.json(data);
};

export const PATCH = withCrossCutting(patchHandler);
