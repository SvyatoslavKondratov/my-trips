import {Grid, Link, Typography} from '@mui/material';
import Image from 'next/image';
import {useDialog} from '@/app/hooks/useDialog';
import {type AllTripsCardType} from '@/app/types/card-types';

export default function AllTripsCard(
	data: Pick<AllTripsCardType, 'title' | 'description' | 'photo_url'> & {
		openTripDetails: () => void;
		onDelete: () => void;
	},
) {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {title, description, photo_url, openTripDetails, onDelete} = data;
	const {showDialog, hideDialog, DialogPopup} = useDialog();
	return (
		<Grid
			container
			item
			flexDirection="row"
			sx={{
				borderWidth: 1,
				borderStyle: 'solid',
				borderRadius: 2,
				borderColor: 'lightGray',
				maxWidth: 928,
			}}
		>
			<Grid container item md={3} sm={3} xs={4} position="relative">
				<Image
					fill
					src={photo_url}
					alt="Portugal"
					style={{borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}
				/>
			</Grid>
			<Grid
				container
				item
				alignItems="flex-start"
				flexDirection="column"
				md={8}
				ml={2}
				sm={8}
				xs={6}
				gap={2}
				m={2}
			>
				<Typography variant="h5">{title}</Typography>
				<Typography variant="subtitle2">{description}</Typography>
				<Grid
					container
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					gap={1}
				>
					<Link
						component="button"
						variant="subtitle2"
						underline="always"
						onClick={openTripDetails}
					>
						See trip details
					</Link>
					<Grid
						flexDirection="row"
						justifyContent="flex-end"
						alignItems="center"
					>
						<Link
							component="button"
							variant="subtitle2"
							underline="always"
							sx={{marginRight: 2}}
							// eslint-disable-next-line @typescript-eslint/no-empty-function
							onClick={() => {}}
						>
							Edit
						</Link>
						<Link
							component="button"
							variant="subtitle2"
							underline="always"
							onClick={showDialog}
						>
							Delete
						</Link>
					</Grid>
				</Grid>
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
							onDelete();
						},
						color: 'secondary',
					},
				]}
			>
				<Typography variant="body2">
					Clicking proceed will delete trip
				</Typography>
			</DialogPopup>
		</Grid>
	);
}
