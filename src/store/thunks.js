import { setCourses } from './courses/actions';
import { setAuthors } from './authors/actions';
import { fetchCourses, fetchAuthors } from '../services';

export const fetchCoursesData = () => {
	return async (dispatch) => {
		try {
			const courses = await fetchCourses();
			dispatch(setCourses(courses));
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	};
};

export const fetchAuthorsData = () => {
	return async (dispatch) => {
		try {
			const authors = await fetchAuthors();
			dispatch(setAuthors(authors));
		} catch (error) {
			console.error('Error fetching authors:', error);
		}
	};
};
