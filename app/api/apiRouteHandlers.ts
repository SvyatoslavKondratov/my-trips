/* eslint-disable n/file-extension-in-import */
import {type NextRequest} from 'next/server';
import {type BackendError} from '../utils/backend-error';

type Handler<T> = (
	request: NextRequest,
	context: {params: T},
) => Promise<Response>;

const withErrorHandling = <T>(handler: Handler<T>): Handler<T> => {
	return async (request: NextRequest, context: {params: T}) => {
		try {
			return await handler(request, context);
		} catch (error) {
			const {errorResponse, status} = error as BackendError;

			return new Response(
				JSON.stringify({
					...errorResponse,
				}),
				{
					status: status || 500,
				},
			);
		}
	};
};

const withCrossCutting = <T>(handler: Handler<T>): Handler<T> => {
	return withErrorHandling(handler);
};

export {withErrorHandling};
export default withCrossCutting;
