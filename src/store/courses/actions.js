import {
	SET_COURSES,
	SAVE_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './types';

export const setCourses = (courses) => ({
	type: SET_COURSES,
	payload: courses,
});

export const saveCourse = (course) => ({
	type: SAVE_COURSE,
	payload: course,
});

export const deleteCourse = (courseId) => ({
	type: DELETE_COURSE,
	payload: courseId,
});

export const updateCourse = (course) => ({
	type: UPDATE_COURSE,
	payload: course,
});
