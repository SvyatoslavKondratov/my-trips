'use client';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {TripStatus} from '@/app/types/card-types';

type NavigationButtonsType = {
	onClick: (status: TripStatus) => void;
};

export default function NavigationButtons({onClick}: NavigationButtonsType) {
	return (
		<Grid container flexDirection="row" justifyContent="center">
			<ButtonGroup variant="outlined" color="secondary">
				<Button
					sx={{
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						'&:focus': {
							backgroundColor: '#F3F3F3',
						},
						'&:hover': {
							backgroundColor: '#F3F3F3',
						},
					}}
					onClick={() => {
						onClick(TripStatus.all);
					}}
				>
					All
				</Button>
				<Button
					sx={{
						'&:focus': {
							backgroundColor: '#F3F3F3',
						},
						'&:hover': {
							backgroundColor: '#F3F3F3',
						},
					}}
					onClick={() => {
						onClick(TripStatus.todo);
					}}
				>
					Upcoming
				</Button>
				<Button
					sx={{
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						'&:focus': {
							backgroundColor: '#F3F3F3',
						},
						'&:hover': {
							backgroundColor: '#F3F3F3',
						},
					}}
					onClick={() => {
						onClick(TripStatus.done);
					}}
				>
					Completed
				</Button>
			</ButtonGroup>
		</Grid>
	);
}
