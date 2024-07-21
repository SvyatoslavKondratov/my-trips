'use client';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {CardStatus} from '@/app/types/card-types';

type NavigationButtonsType = {
	onClick: (status: CardStatus) => void;
};

export default function NavigationButtons({onClick}: NavigationButtonsType) {
	return (
		<Grid container flexDirection="row" justifyContent="center">
			<ButtonGroup variant="outlined" color="secondary">
				<Button
					sx={{
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						color: 'black',
					}}
					onClick={() => {
						onClick(CardStatus.all);
					}}
				>
					All
				</Button>
				<Button
					sx={{color: 'black'}}
					onClick={() => {
						onClick(CardStatus.todo);
					}}
				>
					Upcoming
				</Button>
				<Button
					sx={{
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						color: 'black',
					}}
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
