/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/naming-convention */
import type {Meta, StoryObj} from '@storybook/react';
import {within, userEvent, expect} from '@storybook/test';
import AllTripsCard from '@/app/components/cards/all/all-trips-card';

const meta = {
	title: 'Components/AllTripsCard',
	component: AllTripsCard,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen',
	},
} satisfies Meta<typeof AllTripsCard>;

export default meta;
const data = {
	title: 'Portugal',
	description: 'some stuff',
	photo_url:
		'https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg',
};

type Story = StoryObj<typeof AllTripsCard>;

export const PositiveData: Story = {
	render: (args) => <AllTripsCard {...args} />,
	args: {
		description: data.description,
		photo_url: data.photo_url,
		title: data.title,
		openTripDetails() {},
		onEdit() {},
		onDelete() {},
	},
	async play({canvasElement}) {
		const canvas = within(canvasElement);

		// Starts querying from the component's root element
		const imageContainer = await canvas.findByTestId('image-container');
		const tripDetail = await canvas.findByTestId('trip-details');
		await expect(tripDetail).toBeVisible();
		await expect(imageContainer).toBeVisible();
	},
};
