import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from '../CourseCard';
import { createStore } from 'redux';
import rootReducer from '../../../../../store/rootReducer';
import { Provider } from 'react-redux';
import { formatDuration } from '../../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../../helpers/formatCreationDate';

global.localStorage = {
	getItem: jest.fn((key) => {
		if (key === 'token') return 'mockToken';
		if (key === 'name') return 'mockName';
		if (key === 'email') return 'moxkEmail@example.com';
		if (key === 'role') return 'admin';
		return null;
	}),
};

describe('CourseCard Component', () => {
	const mockCourse = {
		id: '1',
		title: 'Test Course',
		description: 'Test Description',
		duration: 120,
		authors: ['1'],
		creationDate: '2023-09-04',
	};
	const mockAuthors = [{ id: '1', name: 'Test Name' }];

	const mockStore = createStore(rootReducer, {
		user: {
			isAuth: Boolean(localStorage.getItem('token')),
			name: localStorage.getItem('name'),
			email: localStorage.getItem('email'),
			role: localStorage.getItem('role') || null,
		},
	});

	it('should display title', () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<BrowserRouter>
					<CourseCard course={mockCourse} authors={mockAuthors} />
				</BrowserRouter>
			</Provider>
		);
		expect(getByText(mockCourse.title)).toBeInTheDocument();
	});

	it('should display description', () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<BrowserRouter>
					<CourseCard course={mockCourse} authors={mockAuthors} />
				</BrowserRouter>
			</Provider>
		);
		expect(getByText(mockCourse.description)).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<BrowserRouter>
					<CourseCard course={mockCourse} authors={mockAuthors} />
				</BrowserRouter>
			</Provider>
		);
		const formattedDuration = formatDuration(mockCourse.duration);
		expect(getByText(`Duration: ${formattedDuration}`)).toBeInTheDocument();
	});

	it('should display authors list', () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<BrowserRouter>
					<CourseCard course={mockCourse} authors={mockAuthors} />
				</BrowserRouter>
			</Provider>
		);
		const authorsList = mockAuthors.map((author) => author.name).join(', ');
		expect(getByText(`Authors: ${authorsList}`)).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		const { getByText } = render(
			<Provider store={mockStore}>
				<BrowserRouter>
					<CourseCard course={mockCourse} authors={mockAuthors} />
				</BrowserRouter>
			</Provider>
		);
		const formattedDate = formatCreationDate(mockCourse.creationDate);
		expect(getByText(`Creation Date: ${formattedDate}`)).toBeInTheDocument();
	});
});
