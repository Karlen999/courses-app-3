import { fetchAuthors } from '../../services';
import { setAuthors } from './actions';

export const fetchAuthorsThunk = () => async (dispatch) => {
	try {
		const authors = await fetchAuthors();
		dispatch(setAuthors(authors));
	} catch (error) {
		console.error('Failed to fetch authors:', error);
	}
};
