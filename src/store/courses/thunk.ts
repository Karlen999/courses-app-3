import {
	addCourseAPI,
	deleteCourseAPI,
	fetchCourses,
	updateCourseAPI,
} from '../../services';
import { deleteCourse, saveCourse, setCourses, updateCourse } from './actions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Course } from '../../types';

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export const fetchCoursesThunk = (): AppThunk => async (dispatch) => {
	try {
		const courses = await fetchCourses();
		dispatch(setCourses(courses));
	} catch (error) {
		console.error('Failed to fetch courses:', error);
	}
};

export const addCourseThunk =
	(courseData: Partial<Course>): AppThunk =>
	async (dispatch) => {
		try {
			const newCourse = await addCourseAPI(courseData);
			dispatch(saveCourse(newCourse));
		} catch (error) {
			console.error('Failed to add the course:', error);
		}
	};

export const updateCourseThunk =
	(courseId: string, courseData: Partial<Course>): AppThunk =>
	async (dispatch) => {
		try {
			const updatedCourse = await updateCourseAPI(courseId, courseData);
			dispatch(updateCourse(updatedCourse));
		} catch (error) {
			console.error('Failed to update the course:', error);
		}
	};

export const deleteCourseThunk =
	(courseId: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			await deleteCourseAPI(courseId);
			dispatch(deleteCourse(courseId));
		} catch (error) {
			console.error('There was an error:', error);
		}
	};
