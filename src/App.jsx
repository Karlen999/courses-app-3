import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import EmptyCoursesList from './components/Courses/EmptyCoursesList';
import { mockedCoursesList, mockedAuthorsList } from './constants';

const App = () => {
	// Determine if courses are available
	const hasCourses = mockedCoursesList && mockedCoursesList.length > 0;

	return (
		<Router>
			<div className='app-container'>
				<Header />
				<main>
					<Routes>
						{/* Render Courses or EmptyCoursesList based on availability */}
						<Route
							path='/'
							element={
								hasCourses ? (
									<Courses
										courses={mockedCoursesList}
										authors={mockedAuthorsList}
									/>
								) : (
									<EmptyCoursesList />
								)
							}
						/>
						{/* Render CourseInfo for specific course */}
						<Route
							path='/course/:id'
							element={<CourseInfo authors={mockedAuthorsList} />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
