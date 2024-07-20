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
				justifyContent: 'space-between',
				marginBottom: 2,
			}}
		>
			<Grid container item position="relative" md={5.5} sm={5.5} xs={4.9}>
				<Image
					fill
					sizes="100vw"
					src={photo_url}
					alt={title}
					style={{
						borderTopLeftRadius: 8,
						borderBottomLeftRadius: 8,
						objectFit: 'cover',
					}}
				/>
			</Grid>
			<Grid
				container
				item
				flexDirection="column"
				mr={2}
				mt={2}
				mb={2}
				gap={2}
				md={6}
				sm={6}
				xs={6}
			>
				<Typography variant="h5">{title}</Typography>
				<Typography variant="subtitle2">{description}</Typography>
				<Grid
					container
					item
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
