import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import './Courses.css';
import { useNavigate } from 'react-router-dom';

type AuthorType = {
	id: string;
	name: string;
};

type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

type CoursesProps = {
	courses: CourseType[];
	authors: AuthorType[];
};

const Courses: React.FC<CoursesProps> = ({ courses, authors }) => {
	const navigate = useNavigate();
	const [filteredCourses, setFilteredCourses] = useState(courses);

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
			{/* Header section with search bar and "Add New Course" button */}
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
