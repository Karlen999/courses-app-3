import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './CourseInfo.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';

type ParamsType = {
	id: string;
};
type AuthorType = {
	id: string;
	name: string;
};
type CourseInfoProps = {
	authors: AuthorType[];
};

const CourseInfo: React.FC<CourseInfoProps> = ({ authors }) => {
	const { id } = useParams<ParamsType>();
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
			<Button buttonText='Back' onClick={() => navigate('/courses')} />
		</div>
	);
};

export default CourseInfo;
