import {redirect} from 'next/navigation';
// eslint-disable-next-line n/file-extension-in-import
import {routes} from './constants/routes';

export default function Home() {
	return redirect(routes.landing);
}
