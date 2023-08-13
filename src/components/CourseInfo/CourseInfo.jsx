import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './CourseInfo.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

const CourseInfo = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const course = mockedCoursesList.find((course) => course.id === id);

	// If course is not found, display an error message
	if (!course) {
		return <div>Course not found!</div>;
	}

	// Get the names of authors based on the author ids in the course details
	const authorsList = course.authors
		.map(
			(authorId) =>
				mockedAuthorsList.find((author) => author.id === authorId)?.name
		)
		.filter(Boolean)
		.join(', ');

	return (
		<div className='course-info'>
			<h1>{course.title}</h1>
			<p>Duration: {course.duration}</p>
			<p>Creation Date: {course.creationDate}</p>
			<p>Description: {course.description}</p>
			<p>Authors: {authorsList}</p>
			<Button buttonText='Back' onClick={() => navigate('/')} />
		</div>
	);
};

export default CourseInfo;
