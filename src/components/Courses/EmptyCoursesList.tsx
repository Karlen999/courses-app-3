import React from 'react';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom'; // import the hook
import './EmptyCoursesList.css';

interface EmptyCoursesListProps {
	userRole?: 'ADMIN' | 'REGULAR';
}

const EmptyCoursesList: React.FC<EmptyCoursesListProps> = ({ userRole }) => {
	const ADD_NEW_COURSE_TEXT = 'Add New Course';
	const NO_PERMISSION_TEXT =
		"You don't have permissions to create a course. Please log in as ADMIN";

	const navigate = useNavigate(); // initialize the hook

	const handleAddCourseClick = () => {
		navigate('/courses/add'); // navigate to the add course route
	};

	return (
		<div className='empty-course-list'>
			<h1>Course List is Empty</h1>
			<h3>Please use "Add New Course" button to add your first course</h3>
			{userRole === 'ADMIN' ? (
				<Button
					buttonText={ADD_NEW_COURSE_TEXT}
					onClick={handleAddCourseClick}
				/>
			) : (
				<p>{NO_PERMISSION_TEXT}</p>
			)}
		</div>
	);
};

export default EmptyCoursesList;
