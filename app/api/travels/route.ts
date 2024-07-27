/* eslint-disable n/file-extension-in-import */
import {NextResponse, type NextRequest} from 'next/server';
import {BASE_URL} from '../../constants/urls';
import {type TripType} from '../../types/card-types';
import withCrossCutting from '../apiRouteHandlers';

const getHandler = async (req: NextRequest) => {
	const response = await fetch(`${BASE_URL}/travels`);
	const data = (await response.json()) as TripType[];
	return NextResponse.json(data);
};

export const GET = withCrossCutting(getHandler);
