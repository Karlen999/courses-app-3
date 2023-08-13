import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, authors }) => {
	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours < 10 ? '0' + hours : hours}:${
			mins < 10 ? '0' + mins : mins
		} ${hours === 1 ? 'hour' : 'hours'}`;
	};

	const formatCreationDate = (date) => {
		const [month, day, year] = new Date(date).toLocaleDateString().split('/');
		return `${day}.${month}.${year}`;
	};

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
