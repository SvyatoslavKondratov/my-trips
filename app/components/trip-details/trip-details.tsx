/* eslint-disable n/file-extension-in-import */
import {
	ButtonBase,
	CircularProgress,
	Dialog,
	DialogContent,
	Grid,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {useQuery} from '@tanstack/react-query';
import {TripTimeline} from '../triptimeline/trip-timeline';
import {useDialog} from '@/app/hooks/useDialog';
import {useTripDetailsMutation} from '@/app/hooks/useTripDetailsMutation';
import {type TripType, TripStatus} from '@/app/types/card-types';

type TripDetailsType = {
	// eslint-disable-next-line react/boolean-prop-naming
	open: boolean;
	openTripId: string;
	handleClose: () => void;
};

export function TripDetails({open, handleClose, openTripId}: TripDetailsType) {
	const {data, isPending} = useQuery<TripType[]>({queryKey: ['getAllTrips']});
	const {showDialog, hideDialog, DialogPopup} = useDialog();
	const mutation = useTripDetailsMutation();
	if (isPending) {
		return <CircularProgress size="large" />;
	}

	if (!data) {
		return 'No data!';
	}

	const trip = data.find(({id, title}) => id + title === openTripId)!;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {photo_url, title, description, itinerary, status} = trip;

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
						borderRadius: 5,
					},
				},
			}}
			onClose={handleClose}
		>
			<DialogContent
				sx={{
					backgroundColor: 'white',
					padding: 0,
				}}
			>
				<Grid container item justifyContent="center">
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
								<Grid
									container
									item
									alignItems="center"
									justifyContent="flex-start"
								>
									<CheckCircleOutlineIcon
										fontSize="small"
										htmlColor={status === TripStatus.todo ? 'gray' : 'green'}
									/>
									<Typography variant="subtitle2" ml={1}>
										{status === TripStatus.todo
											? 'Mark as completed'
											: 'Complete'}
									</Typography>
								</Grid>
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
											trip.status === TripStatus.done
												? TripStatus.todo
												: TripStatus.done,
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
			</DialogContent>
		</Dialog>
	);
}
