import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';
import { Course, Author } from '../../../../types';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

type CourseCardProps = {
	course: Course;
	authors: Author[];
};

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const getAuthorsNames = (authorId: string[]): string => {
		if (!authors) return '';

		return authorId
			.map((id) => authors.find((author) => author.id === id)?.name)
			.join(', ');
	};

	return (
		<Link to={`/course/${course.id}`} className='course-card-link'>
			<div className='course-card'>
				<div className='course-card-left'>
					<h2 className='course-card-title'>{course.title}</h2>
					<p>{course.description}</p>
				</div>
				<div className='course-card-right'>
					<div className='course-card-details'>
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
