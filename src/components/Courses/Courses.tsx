import React, { Dispatch, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { Author, Course, RootState } from '../../types';
import './Courses.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthors } from '../../store/authors/actions';
import { fetchAuthors, fetchCourses } from '../../services';
import { setCourses } from '../../store/courses/actions';

const Courses: React.FC = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const courses = useSelector((state: RootState) => state.courses);
	const authors = useSelector((state: RootState) => state.authors);
	console.log('Authors from Redux:', authors);

	const navigate = useNavigate();
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const coursesData = await fetchCourses();
				dispatch(setCourses(coursesData));

				const authorsData = await fetchAuthors();
				dispatch(setAuthors(authorsData));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData().catch((error) => {
			console.error('Unhandled error:', error);
		});
	}, [dispatch]);

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
				<Button
					buttonText='Add New Course'
					onClick={() => navigate('/courses/add')}
				/>
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
