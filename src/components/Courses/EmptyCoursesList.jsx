import React from 'react';
import Button from '../../common/Button/Button';
import './EmptyCoursesList.css';

const EmptyCoursesList = () => {
	const ADD_NEW_COURSE_TEXT = 'Add New Course';
	return (
		<div className='empty-course-list'>
			<h1>Course List is Empty</h1>
			<h3>Please use "Add New Course" button to add your first course</h3>
			<Button buttonText={ADD_NEW_COURSE_TEXT} />
		</div>
	);
};

export default EmptyCoursesList;
