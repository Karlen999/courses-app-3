import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseCard.css';
import { Course, Author, RootState } from '../../../../types';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import DeleteIcon from '../../../../assets/DeleteIcon.svg';
import EditIcon from '../../../../assets/EditIcon.svg';
import { deleteCourse } from '../../../../store/courses/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../common/Button/Button';
import { deleteCourseThunk } from '../../../../store/courses/thunk';
import { AppDispatch } from '../../../../store';

type CourseCardProps = {
	course: Course;
	authors: Author[];
};

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const role = useSelector((state: RootState) => state.user.role);
	const getAuthorsNames = (authorId: string[]): string => {
		return authorId
			.map((id) => authors.find((author) => author.id === id)?.name)
			.join(', ');
	};

	const handleDelete = () => {
		dispatch(deleteCourseThunk(course.id));
	};

	const handleUpdate = () => {
		navigate(`/courses/update/${course.id}`);
	};

	return (
		<Link to={`/courses/${course.id}`} className='course-card-link'>
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
						{role === 'admin' && (
							<button className='course-button' onClick={handleDelete}>
								<img src={DeleteIcon} alt='' />
							</button>
						)}
						{role === 'admin' && (
							<button className='course-button' onClick={handleUpdate}>
								<img src={EditIcon} alt='' />
							</button>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
