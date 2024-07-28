/* eslint-disable n/file-extension-in-import */
import {describe, jest, test, expect, beforeEach} from '@jest/globals';
import {renderHook, waitFor} from '@testing-library/react';
import {faker} from '@faker-js/faker';
import fetchMock from 'jest-fetch-mock';
import {withMockedQueryClient} from '../utils/test/with-mocked-query-client';
import {useDeleteTripMutation} from './useDeleteTripMutation';

describe('useDelete TripMutation', () => {
	const fakerPostId = faker.number.int();
	beforeEach(() => {
		fetchMock.resetMocks();
	});
	test('successfully delete trip', async () => {
		fetchMock.doMock(JSON.stringify({}));

		const {result} = renderHook(() => useDeleteTripMutation(), {
			wrapper: ({children}) => withMockedQueryClient(children),
		});
		const {mutate} = result.current;
		mutate({id: fakerPostId});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
			expect(result.current.data).toBe(fakerPostId);
		});
	});

	test('failed delete trip', async () => {
		fetchMock.mockReject(new Error('Error'));

		const {result} = renderHook(() => useDeleteTripMutation(), {
			wrapper: ({children}) => withMockedQueryClient(children),
		});
		const {mutate} = result.current;
		mutate({id: fakerPostId});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});
	});
});
