/* eslint-disable n/file-extension-in-import */
import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import React, {useState} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {ItineraryItem} from './itinerary-item';
import {type Itinerary, type TripType} from '@/app/types/card-types';

type CreateTripType = {
	// eslint-disable-next-line react/boolean-prop-naming
	open: boolean;
	trip?: TripType;
	handleClose: () => void;
};

export function CreateTrip({open, trip, handleClose}: CreateTripType) {
	const isEdit = Boolean(trip);
	const title = isEdit ? 'Edit trip' : 'Create trip';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {title: tripTitle, description, photo_url, itinerary} = trip ?? {};
	const [itineraryState, setItineraryState] = useState(itinerary ?? []);
	return (
		<Dialog
			fullWidth
			open={open}
			scroll="paper"
			maxWidth="md"
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				'& .MuiDialog-container': {
					width: '100%',
					'& .MuiPaper-root': {
						width: '100%',
					},
				},
			}}
			onClose={handleClose}
		>
			<DialogContent>
				<Grid
					container
					item
					sx={{
						backgroundColor: 'white',
						borderRadius: 2,
						flexDirection: 'column',
					}}
					p={4}
					justifyContent="center"
					gap={2}
				>
					<Typography variant="h3">{title}</Typography>
					<TextField
						placeholder="Italy"
						label="Name"
						defaultValue={tripTitle}
						variant="outlined"
					/>
					<TextField
						multiline
						placeholder="Discover the wonders of the Roman empire..."
						label="Description"
						defaultValue={description}
						variant="outlined"
					/>
					<TextField
						placeholder="Image URL"
						label="Image"
						defaultValue={photo_url}
						variant="outlined"
					/>
					<Grid
						container
						item
						flexDirection="row"
						justifyContent="space-between"
					>
						<Typography variant="subtitle2">Day by day itinerary</Typography>
						<IconButton
							onClick={() => {
								const items = [...itineraryState];
								items.push({} as Itinerary);
								setItineraryState(items);
							}}
						>
							<AddCircleOutlineOutlinedIcon fontSize="small" />
						</IconButton>
					</Grid>
					{itineraryState.map((itineraryItem) => (
						<ItineraryItem key={itineraryItem.day} itinerary={itineraryItem} />
					))}
					<Grid container item>
						<Button
							color="primary"
							sx={{
								backgroundColor: 'black',
								color: 'white',
								padding: '8px 32px',
								borderRadius: 5,
								textTransform: 'capitalize',
							}}
						>
							<Typography variant="subtitle2">Save</Typography>
						</Button>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}
