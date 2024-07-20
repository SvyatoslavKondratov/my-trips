/* eslint-disable n/file-extension-in-import */
import {ButtonBase, Grid, Modal, Typography} from '@mui/material';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {useQuery} from '@tanstack/react-query';
import {TripTimeline} from '../triptimeline/trip-timeline';
import {useDialog} from '@/app/hooks/useDialog';
import {useTripDetailsMutation} from '@/app/hooks/useTripDetailsMutation';
import {type AllTripsCardType, CardStatus} from '@/app/types/card-types';

type TripDetailsType = {
	// eslint-disable-next-line react/boolean-prop-naming
	open: boolean;
	openTripId?: string;
	handleClose: () => void;
};

export function TripDetails({open, handleClose, openTripId}: TripDetailsType) {
	const {data} = useQuery<AllTripsCardType[]>({queryKey: ['getAllTrips']});
	const {showDialog, hideDialog, DialogPopup} = useDialog();
	const mutation = useTripDetailsMutation();

	if (!data) {
		// TODO add error handling
		return <Typography variant="subtitle1">No Data!</Typography>;
	}

	const trip = data.find(({id, title}) => id + title === openTripId);

	if (!trip) {
		// TODO handle this
		return;
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {photo_url, title, description, itinerary} = trip;

	return (
		<Modal
			open={open}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'scroll',
			}}
			onClose={handleClose}
		>
			<Grid
				container
				item
				sx={{
					backgroundColor: 'white',
					borderRadius: 2,
					maxHeight: '100%',
					overflow: 'scroll',
				}}
				justifyContent="center"
				maxWidth={640}
			>
				<Grid
					container
					item
					position="relative"
					height={250}
					flexDirection="column"
				>
					<Grid
						container
						item
						justifyContent="flex-end"
						sx={{zIndex: 1000}}
						pr={2}
						pt={2}
					>
						<ButtonBase onClick={handleClose}>
							<CancelIcon fontSize="small" />
						</ButtonBase>
					</Grid>
					<Image
						fill
						sizes="100vmin"
						src={photo_url}
						alt={title}
						style={{
							borderTopLeftRadius: 8,
							borderTopRightRadius: 8,
							objectFit: 'cover',
						}}
					/>
				</Grid>
				<Grid container item p={4}>
					<Grid
						container
						item
						pb={4}
						flexDirection="column"
						sx={{
							borderBottomStyle: 'solid',
							borderBottomWidth: 1,
							borderColor: 'gray',
						}}
					>
						<Typography variant="h3">{title}</Typography>
						<ButtonBase sx={{marginBottom: 4}} onClick={showDialog}>
							{trip.status === CardStatus.todo ? (
								<Grid
									container
									item
									alignItems="flex-end"
									justifyContent="flex-start"
								>
									<CheckCircleOutlineIcon fontSize="small" htmlColor="gray" />
									<Typography
										variant="subtitle2"
										ml={2}
										sx={{textAlign: 'center'}}
									>
										Mark as completed
									</Typography>
								</Grid>
							) : (
								<Grid
									container
									item
									alignItems="flex-end"
									justifyContent="flex-start"
								>
									<CheckCircleIcon fontSize="small" htmlColor="green" />
									<Typography
										variant="subtitle2"
										ml={2}
										sx={{textAlign: 'center'}}
									>
										Complete
									</Typography>
								</Grid>
							)}
						</ButtonBase>
						<Typography variant="subtitle2">{description}</Typography>
					</Grid>
				</Grid>
				<Grid container item pr={4} pl={4} pb={4}>
					<TripTimeline itinerary={itinerary} />
				</Grid>
				{/* Add hooks and abstractions need to move content creation of dialog in separete file */}
				<DialogPopup
					title="Are you sure?"
					actions={[
						{
							text: 'Close',
							onClick: hideDialog,
							color: 'secondary',
						},
						{
							text: 'Proceed',
							async onClick() {
								hideDialog();
								mutation.mutate({
									id: trip.id,
									status:
										trip.status === CardStatus.done
											? CardStatus.todo
											: CardStatus.done,
								});
							},
							color: 'secondary',
						},
					]}
				>
					<Typography variant="body2">
						Clicking proceed will change trip status
					</Typography>
				</DialogPopup>
			</Grid>
		</Modal>
	);
}
