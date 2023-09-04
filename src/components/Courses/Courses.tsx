import React, { Dispatch, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { Author, Course, RootState } from '../../types';
import './Courses.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesThunk } from '../../store/courses/thunk';
import { fetchAuthorsThunk } from '../../store/authors/thunk';

const Courses: React.FC = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const courses = useSelector((state: RootState) => state.courses);
	const authors = useSelector((state: RootState) => state.authors);

	const navigate = useNavigate();
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
	const token = localStorage.getItem('token');
	const userRole = useSelector((state: RootState) => state.user.role);

	useEffect(() => {
		if (token) {
			dispatch(fetchCoursesThunk());
			dispatch(fetchAuthorsThunk());
		}
	}, [dispatch, token]);

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);
	const handleSearch = (query: string) => {
		if (!query) {
			setFilteredCourses(courses);
			return;
		}

		const lowercaseQuery = query.toLowerCase();
		const matchingCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowercaseQuery) ||
				course.id.toString().includes(lowercaseQuery)
		);
		setFilteredCourses(matchingCourses);
	};

	return (
		<div className='courses-container'>
			<div className='courses-header'>
				<SearchBar onSearch={handleSearch} />
				{userRole === 'admin' && (
					<Button
						buttonText='Add New Course'
						onClick={() => navigate('/courses/add')}
					/>
				)}
			</div>

			{filteredCourses.map((course) => (
				<CourseCard
					key={course.id}
					course={course}
					authors={authors} // Use the authors prop here
				/>
			))}
		</div>
	);
};

export default Courses;
