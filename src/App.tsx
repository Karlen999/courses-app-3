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
import useProtectedElement from './utils/useProtectedElement';

const App: React.FC = () => {
	const dispatch = useDispatch();

	const coursesFromStore = useSelector((state: RootState) => state.courses);
	const authorsFromStore = useSelector((state: RootState) => state.authors);
	const userRoleFromStore = useSelector((state: RootState) => state.user.role);

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
							element={useProtectedElement(
								<CreateCourse addCourse={addCourse} />
							)}
						/>
						<Route
							path='/courses'
							element={useProtectedElement(
								hasCourses ? (
									<Courses />
								) : (
									<EmptyCoursesList userRole={userRoleFromStore} />
								)
							)}
						/>
						<Route
							path='/courses/:courseId'
							element={useProtectedElement(
								<CourseInfo authors={authorsFromStore} />
							)}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
