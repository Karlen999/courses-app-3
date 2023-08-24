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
import { RootState, Course } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from './store/user/actions';

const App: React.FC = () => {
	const dispatch = useDispatch();

	const coursesFromStore = useSelector((state: RootState) => state.courses);
	const authorsFromStore = useSelector((state: RootState) => state.authors);
	const userRoleFromStore = useSelector((state: RootState) => state.user.role);
	const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);

	const hasCourses = coursesFromStore && authorsFromStore.length > 0;
	const [coursesList, setCoursesList] = useState<Course[]>(coursesFromStore);
	const addCourse = (newCourse: Course) => {
		setCoursesList((prevCourses) => [...prevCourses, newCourse]);
	};

	return (
		<Router>
			<Header />
			<div className='app-container'>
				<main>
					<Routes>
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
										<Courses />
									) : (
										<EmptyCoursesList userRole={userRoleFromStore} />
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
									<CourseInfo authors={authorsFromStore} />
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
