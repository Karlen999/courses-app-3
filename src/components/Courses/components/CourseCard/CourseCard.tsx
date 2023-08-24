import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseCard.css';
import { Course, Author } from '../../../../types';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import DeleteIcon from '../../../../assets/DeleteIcon.svg';
import EditIcon from '../../../../assets/EditIcon.svg';
import { deleteCourse } from '../../../../store/courses/actions';
import { useDispatch } from 'react-redux';
import Button from '../../../../common/Button/Button';

type CourseCardProps = {
	course: Course;
	authors: Author[];
};

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const getAuthorsNames = (authorId: string[]): string => {
		if (!authors) return '';

		return authorId
			.map((id) => authors.find((author) => author.id === id)?.name)
			.join(', ');
	};

	const handleDelete = () => {
		dispatch(deleteCourse(course.id));
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
					<div className='course-buttons-container'>
						<button
							className='course-card-right button'
							onClick={() => navigate(`/courses/${course.id}`)}
						>
							Show Course
						</button>
						<button className='course-button' onClick={handleDelete}>
							<img src={DeleteIcon} alt='' />
						</button>
						<button className='course-button'>
							<img src={EditIcon} alt='' />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
