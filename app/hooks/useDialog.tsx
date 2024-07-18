import {useState} from 'react';
import DialogPopup from '../components/dialog/dialog';
import { type DialogPopupProps } from '../components/dialog/dialog';


export function useDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const showDialog = () => {
		setIsDialogOpen(true);
	};

	const hideDialog = () => {
		setIsDialogOpen(false);
	};

	function DialogPopupWrapper(
		props: Omit<DialogPopupProps, 'isOpen' | 'onClose'>,
	) {
		return (<DialogPopup isOpen={isDialogOpen} onClose={hideDialog} {...props} />);
	}

	return {
		showDialog,
		hideDialog,
		DialogPopup: DialogPopupWrapper,
	};
}
