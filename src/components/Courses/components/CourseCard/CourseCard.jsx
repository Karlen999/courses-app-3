import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

const CourseCard = ({ course, authors }) => {
	const getAuthorsNames = (authorId) => {
		if (!authors) return ''; // Return an empty string if authors is not defined

		return authorId
			.map((id) => authors.find((author) => author.id === id)?.name)
			.join(', ');
	};

	return (
		<Link to={`/course/${course.id}`} className='course-card-link'>
			<div className='course-card'>
				<div className='course-card-left'>
					<h2>{course.title}</h2>
					<p>{course.description}</p>
				</div>
				<div className='course-card-right'>
					<div>
						<p>Duration: {formatDuration(course.duration)}</p>
						<p>Creation Date: {formatCreationDate(course.creationDate)}</p>
						<p>Authors: {getAuthorsNames(course.authors)}</p>
					</div>
					<button>Show Course</button>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
