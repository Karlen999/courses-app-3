import { act, fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../../../store/rootReducer';
import { createStore } from 'redux';
import CourseForm from '../CourseForm';
import { addAuthorAPI } from '../../../services';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));
jest.mock('../../../services', () => ({
	...jest.requireActual('../../../services'),
	addAuthorAPI: jest.fn(() =>
		Promise.resolve({ id: 'mockId', name: 'New Author' })
	),
}));

describe('CourseForm Component', () => {
	let mockStore;

	beforeEach(() => {
		mockStore = createStore(rootReducer, {
			user: {
				isAuth: true,
				name: 'Test User',
				email: 'test@example.com',
				role: 'admin',
			},
			courses: [],
			authors: [
				{ id: '1', name: 'Author 1' },
				{ id: '2', name: 'Author 2' },
			],
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderWithProviders(ui, { route = '/' } = {}) {
		return {
			...render(
				<Provider store={mockStore}>
					<BrowserRouter>{ui}</BrowserRouter>
				</Provider>
			),
		};
	}

	it('should show authors lists (all and course authors)', () => {
		const { getByText } = renderWithProviders(<CourseForm />);

		expect(getByText('Authors List')).toBeInTheDocument();
		expect(getByText('Course Authors')).toBeInTheDocument();
	});

	it("'Create author' button click should call dispatch", async () => {
		const { getByText, getByTestId } = renderWithProviders(<CourseForm />);

		fireEvent.change(getByTestId('input-author'), {
			target: { value: 'New Author' },
		});

		mockStore.dispatch = jest.fn();

		await act(async () => {
			fireEvent.click(getByText('CREATE AUTHOR'));
		});
		expect(addAuthorAPI).toHaveBeenCalledWith({ name: 'New Author' });
	});

	it("'Add author' button click should add an author to the course authors list.", () => {
		const { getByText, getByTestId } = renderWithProviders(<CourseForm />);

		// Select an author from the dropdown list
		userEvent.selectOptions(getByTestId('authors-list'), ['1']);

		// Click the 'Add author' button
		fireEvent.click(getByTestId('add-author-button'));

		// Ensure 'Author 1' is added to the course authors list
		expect(getByText('Author 1')).toBeInTheDocument();
	});

	it("'Delete author' button click should delete an author from the course authors list.", () => {
		const { getByText, getByTestId, queryByText, container } =
			renderWithProviders(<CourseForm />);

		// First, add an author to the course authors list
		userEvent.selectOptions(getByTestId('authors-list'), ['1']);
		fireEvent.click(getByTestId('add-author-button'));
		expect(getByText('Author 1')).toBeInTheDocument();

		// Now click the 'Delete author' button
		const authorItems = container.querySelectorAll('.author-item');
		const deleteButton = authorItems[0].querySelector(
			'.course-delete-author-button'
		);
		fireEvent.click(deleteButton);

		// Ensure 'Author 1' is no longer in the course authors list
		expect(container.querySelector('.author-name').textContent).not.toContain(
			'Author 1'
		);
		// Ensure 'Author 1' is present in the authors dropdown
		expect(getByTestId('authors-list')).toHaveTextContent('Author 1');
	});
});
