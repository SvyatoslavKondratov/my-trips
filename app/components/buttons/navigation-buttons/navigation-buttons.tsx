'use client';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {CardStatus} from '@/app/types/card-types';

type NavigationButtonsType = {
	onClick: (status?: CardStatus) => void;
};

export default function NavigationButtons({onClick}: NavigationButtonsType) {
	return (
		<Grid container flexDirection="row" justifyContent="center">
			<ButtonGroup variant="outlined" aria-label="Basic button group">
				<Button
					onClick={() => {
						onClick();
					}}
				>
					All
				</Button>
				<Button
					onClick={() => {
						onClick(CardStatus.todo);
					}}
				>
					Upcoming
				</Button>
				<Button
					onClick={() => {
						onClick(CardStatus.done);
					}}
				>
					Completed
				</Button>
			</ButtonGroup>
		</Grid>
	);
}
