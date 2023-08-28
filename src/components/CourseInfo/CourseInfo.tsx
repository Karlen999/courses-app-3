import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import { RootState } from '../../types';
import './CourseInfo.css';

type ParamsType = {
	courseId: string;
};
type AuthorType = {
	id: string;
	name: string;
};
type CourseInfoProps = {
	authors: AuthorType[];
};

const CourseInfo: React.FC<CourseInfoProps> = ({ authors }) => {
	const { courseId } = useParams<ParamsType>();
	console.log('Course ID from URL:', courseId);

	const navigate = useNavigate();

	const courses = useSelector((state: RootState) => state.courses);
	const authorsFromStore = useSelector((state: RootState) => state.authors);

	const course = courses.find((course) => course.id === courseId);
	console.log('Found course:', course);

	if (!course) {
		return <div>Course not found!</div>;
	}

	// Get the names of authors based on the author ids in the course details
	const authorsList = course.authors
		.map(
			(authorId) =>
				authorsFromStore.find((author) => author.id === authorId)?.name
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
