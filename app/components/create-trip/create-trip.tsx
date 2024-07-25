/* eslint-disable n/file-extension-in-import */
import {
	Button,
	ButtonBase,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import * as R from 'rambda';
import CancelIcon from '@mui/icons-material/Cancel';
import {type ItineraryError, ItineraryItem} from './itinerary-item';
import {type TripType} from '@/app/types/card-types';
import {useUpdateTripMutation} from '@/app/hooks/useUpdateTripMutation';

type CreateTripType = {
	// eslint-disable-next-line react/boolean-prop-naming
	open: boolean;
	trip?: TripType;
	handleClose: () => void;
};

const schema = z.object({
	title: z.string().min(3, {message: 'Required'}),
	description: z.string().min(3, {message: 'Required'}),
	photoUrl: z.string().min(3, {message: 'Required'}),
	itinerary: z
		.object({
			day: z.number().min(1, {message: 'Required'}),
			location: z.string().min(3, {message: 'Required'}),
			description: z.string().min(3, {message: 'Required'}),
		})
		.array(),
});

export function CreateTrip({open, trip, handleClose}: CreateTripType) {
	const isEdit = Boolean(trip);
	const title = isEdit ? 'Edit trip' : 'Create trip';
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));
	const isSm = useMediaQuery(theme.breakpoints.between('xs', 'md'));
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const {title: tripTitle, description, photo_url, itinerary, id} = trip ?? {};

	const {
		register,
		formState: {errors, isDirty},
		control,
		handleSubmit,
		watch,
		getValues,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: tripTitle,
			description,
			photoUrl: photo_url,
			itinerary,
		},
		mode: 'onTouched',
	});
	const {fields, append} = useFieldArray({
		control,
		name: 'itinerary',
	});

	const mutation = useUpdateTripMutation();

	const onSubmit = handleSubmit(
		(data) => {
			if (!isDirty) return;
			if (id) {
				console.log('data', data);
				mutation.mutate({id, trip: data});
				handleClose();
			}
		},
		(error) => {
			console.log('Error', error);
		},
	);

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
					<Grid
						container
						item
						justifyContent="space-between"
						mb={2}
						alignItems="center"
					>
						<Typography variant="h3">{title}</Typography>
						<ButtonBase onClick={handleClose}>
							<CancelIcon
								fontSize={isXs ? 'small' : isSm ? 'medium' : 'large'}
							/>
						</ButtonBase>
					</Grid>
					<TextField
						id="title"
						placeholder="Title"
						{...register('title')}
						value={watch('title')}
						data-testid="title-input"
						error={Boolean(errors.title)}
						helperText={errors.title?.message}
						label="Name"
						variant="outlined"
					/>
					<TextField
						multiline
						id="description"
						placeholder="Discover the wonders of the Roman empire..."
						label="Description"
						{...register('description')}
						value={watch('description')}
						data-testid="description-input"
						error={Boolean(errors.description)}
						helperText={errors.description?.message}
						variant="outlined"
					/>
					<TextField
						placeholder="Image URL"
						label="Image"
						{...register('photoUrl')}
						value={watch('photoUrl')}
						data-testid="photoUrl-input"
						error={Boolean(errors.photoUrl)}
						helperText={errors.photoUrl?.message}
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
								const formItinerary = getValues('itinerary');
								const lastDay = R.pipe(
									R.defaultTo([{day: 1}]),
									R.pluck('day'),
									R.last,
								)(formItinerary) as number;
								const day = lastDay + 1;
								append({
									day,
									description: '',
									location: '',
								});
							}}
						>
							<AddCircleOutlineOutlinedIcon fontSize="small" />
						</IconButton>
					</Grid>
					{fields.map((field, index) => (
						<Controller
							key={field.id}
							render={({
								field: {value, onBlur, onChange},
								fieldState: {error},
							}) => (
								<ItineraryItem
									value={value}
									hasError={Boolean(error)}
									error={error as ItineraryError}
									onChange={onChange}
									onBlur={onBlur}
								/>
							)}
							name={`itinerary.${index}`}
							control={control}
						/>
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
							onClick={onSubmit}
						>
							<Typography variant="subtitle2">Save</Typography>
						</Button>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}
