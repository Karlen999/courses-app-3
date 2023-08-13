import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import './Courses.css';

const Courses = ({ courses }) => {
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const handleSearch = (query) => {
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
			{/* Header section with search bar and "Add New Course" button */}
			<div className='courses-header'>
				<SearchBar onSearch={handleSearch} />
				<Button buttonText='Add New Course' />
			</div>

			{filteredCourses.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	);
};

export default Courses;
