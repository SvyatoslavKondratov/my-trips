import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button, {type ButtonOwnProps} from '@mui/material/Button';
import {type ReactNode} from 'react';
import {textFieldStyles} from '@/app/constants/fonts';

export type DialogAction = {
	text: string;
	onClick: () => void;
	color?: ButtonOwnProps['color'];
	variant?: ButtonOwnProps['variant'];
	['data-testid']?: string;
	disabled?: boolean;
};

export type DialogPopupProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	actions: DialogAction[];
	children: ReactNode;
};

export default function DialogPopup({
	isOpen,
	onClose,
	title,
	actions,
	children,
}: DialogPopupProps) {
	return (
		<Dialog fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
			<DialogTitle sx={{...textFieldStyles}}>{title}</DialogTitle>
			<DialogContent sx={{width: '100%'}}>{children}</DialogContent>
			<DialogActions sx={{paddingInline: 2}}>
				{actions.map((action) => (
					<Button
						key={action.text}
						variant="outlined"
						color="secondary"
						sx={{...textFieldStyles}}
						onClick={action.onClick}
					>
						{action.text}
					</Button>
				))}
			</DialogActions>
		</Dialog>
	);
}
