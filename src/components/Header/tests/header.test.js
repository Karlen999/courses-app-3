import rootReducer from '../../../store/rootReducer';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
	it('should have logo and user name if available', () => {
		const mockUserName = 'Test User';
		const mockState = {
			user: {
				name: mockUserName,
				isAuth: true,
			},
		};

		const store = createStore(rootReducer, mockState);

		const { getByText } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(getByText(mockUserName)).toBeInTheDocument();
	});
});
