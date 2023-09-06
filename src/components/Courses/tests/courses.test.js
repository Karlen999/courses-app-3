import { createStore } from 'redux';
import rootReducer from '../../../store/rootReducer';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Courses from '../Courses';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));
describe('Courses Component', () => {
	let mockStore;
	const mockCourses = [
		{
			id: '1',
			title: 'Course 1',
			description: 'Description 1',
			duration: 60,
			authors: ['1'],
			creationDate: '2023-09-04',
		},
		{
			id: '2',
			title: 'Course 2',
			description: 'Description 2',
			duration: 120,
			authors: ['2'],
			creationDate: '2023-09-04',
		},
	];

	beforeEach(() => {
		mockStore = createStore(rootReducer, {
			user: {
				isAuth: true,
				name: 'Test User',
				email: 'test@example.com',
				role: 'admin',
			},
			courses: mockCourses,
			authors: [
				{ id: '1', name: 'Author 1' },
				{ id: '2', name: 'Author 2' },
			],
		});
	});

	function renderWithProviders(ui, { route = '/' } = {}) {
		return {
			...render(
				<Provider store={mockStore}>
					<MemoryRouter>{ui}</MemoryRouter>
				</Provider>
			),
		};
	}

	it('should display amount of CourseCard equal length of courses array ', () => {
		const { getAllByTestId } = renderWithProviders(<Courses />);
		const courseCards = getAllByTestId('course-card');
		expect(courseCards).toHaveLength(mockCourses.length);
	});

	it('should navigate to CourseForm after clicking on "Add new course" button', async () => {
		const { getByText } = renderWithProviders(<Courses />);

		fireEvent.click(getByText('Add New Course'));

		expect(mockNavigate).toHaveBeenCalledWith('/courses/add');
	});
});
