import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import EmptyCoursesList from './components/Courses/EmptyCoursesList';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { mockedCoursesList, mockedAuthorsList } from './constants';

const App = () => {
	// Determine if courses are available
	const hasCourses = mockedCoursesList && mockedCoursesList.length > 0;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<Router>
			<div className='app-container'>
				<Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
				<main>
					<Routes>
						{/* Add routes for Login and Registration */}
						<Route
							path='/login'
							element={
								<Login
									onLoginSuccess={() => {
										setIsLoggedIn(true);
									}}
								/>
							}
						/>
						<Route
							path='/registration'
							element={
								<Registration
									onRegistrationSuccess={() => setIsLoggedIn(true)}
								/>
							}
						/>
						{/* Add the route for the CreateCourse component */}
						<Route path='/courses/add' element={<CreateCourse />} />
						{/* Render Courses or EmptyCoursesList based on availability */}
						<Route
							path='/courses'
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
							path='/courses/:courseId'
							element={<CourseInfo authors={mockedAuthorsList} />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
