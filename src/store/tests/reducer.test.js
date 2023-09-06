import courseReducer from '../courses/reducer';
import { SAVE_COURSE } from '../courses/types';

describe('courseReducer', () => {
	const initialState = [];

	it('should return the initial state', () => {
		expect(courseReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle SAVE_COURSE and returns new state', () => {
		const newCourse = {
			id: '3',
			title: 'New Course',
			description: 'Description for New Course',
			duration: 90,
			authors: ['3'],
			creationDate: '2023-09-05',
		};
		expect(
			courseReducer(initialState, {
				type: SAVE_COURSE,
				payload: newCourse,
			})
		).toEqual([...initialState, newCourse]);
	});
});
