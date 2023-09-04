import React, { useEffect, useState } from 'react';
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
import EmptyCoursesList from './components/Courses/EmptyCoursesList';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { RootState, Course } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from './store/user/actions';
import useProtectedElement from './utils/useProtectedElement';
import CourseForm from './components/CreateCourse/CourseForm';
import { fetchCurrentUser } from './store/user/thunk';
import { AppDispatch } from './store';
import { saveCourse, updateCourse } from './store/courses/actions';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { fetchCoursesThunk } from './store/courses/thunk';

const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const { courses, authors, role } = useSelector((state: RootState) => ({
		courses: state.courses,
		authors: state.authors,
		role: state.user.role,
	}));
	const token = localStorage.getItem('token');

	const hasCourses = courses && courses.length > 0;
	const addCourse = (newCourse: Course) => {
		dispatch(saveCourse(newCourse));
	};

	useEffect(() => {
		if (token) {
			dispatch(fetchCurrentUser());
			dispatch(fetchCoursesThunk());
		}
	}, [token]);

	return (
		<Router>
			<Header />
			<div className='app-container'>
				<main>
					<Routes>
						<Route
							path='/'
							element={
								role ? (
									<Navigate to='/courses' replace />
								) : (
									<Navigate to='/login' replace />
								)
							}
						/>
						<Route
							path='/login'
							element={
								<Login
									onLoginSuccess={() => dispatch(setAuthenticated(true))}
								/>
							}
						/>
						<Route
							path='/registration'
							element={
								<Registration
									onRegistrationSuccess={() => dispatch(setAuthenticated(true))}
								/>
							}
						/>
						<Route path='/courses/add' element={<PrivateRoute />}>
							<Route index element={<CourseForm addCourse={addCourse} />} />
						</Route>
						{/*<Route path='/courses/update/:courseId' element={<PrivateRoute />}>*/}
						{/*	<Route index element={<CourseForm />} />*/}
						{/*</Route>*/}
						<Route
							path='/courses'
							element={useProtectedElement(
								hasCourses ? <Courses /> : <EmptyCoursesList userRole={role} />
							)}
						/>
						<Route
							path='/courses/:courseId'
							element={useProtectedElement(<CourseInfo authors={authors} />)}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
