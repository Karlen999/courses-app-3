import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import EmptyCoursesList from './components/Courses/EmptyCoursesList';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { mockedCoursesList, mockedAuthorsList } from './constants';

type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

const App: React.FC = () => {
	const hasCourses = mockedCoursesList && mockedCoursesList.length > 0;
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const addCourse = (newCourse: Course) => {
		setCoursesList((prevCourses) => [...prevCourses, newCourse]);
	};
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<Router>
			<Header isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
			<div className='app-container'>
				<main>
					<Routes>
						<Route
							path='/login'
							element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
						/>
						<Route
							path='/registration'
							element={
								<Registration
									onRegistrationSuccess={() => setIsLoggedIn(true)}
								/>
							}
						/>
						<Route
							path='/courses/add'
							element={
								isLoggedIn ? (
									<CreateCourse addCourse={addCourse} />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
						<Route
							path='/courses'
							element={
								isLoggedIn ? (
									hasCourses ? (
										<Courses
											courses={coursesList}
											authors={mockedAuthorsList}
										/>
									) : (
										<EmptyCoursesList />
									)
								) : (
									<Navigate to='/login' />
								)
							}
						/>
						<Route
							path='/courses/:courseId'
							element={
								isLoggedIn ? (
									<CourseInfo authors={mockedAuthorsList} />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
