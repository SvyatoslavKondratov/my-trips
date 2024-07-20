/* eslint-disable n/file-extension-in-import */
'use client';
import * as React from 'react';
import {Grid} from '@mui/material';
import CardList from '../components/card-list/card-list';
import {Search} from '../components/search/search';

export default function Landing() {
	return (
		<Grid>
			<Search />
			<CardList />
		</Grid>
	);
}
