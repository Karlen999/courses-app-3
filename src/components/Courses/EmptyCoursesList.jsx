import React from 'react';
import Button from '../../common/Button/Button';
import './EmptyCoursesList.css';

const EmptyCoursesList = () => {
	return (
		<div className='empty-course-list'>
			<h1>Course List is Empty</h1>
			<h3>Please use "Add New Course" button to add your first course</h3>
			<Button buttonText='Add New Course' />
		</div>
	);
};

export default EmptyCoursesList;
