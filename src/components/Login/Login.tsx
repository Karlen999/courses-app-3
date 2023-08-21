import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

interface LoginProps {
	onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newErrors = {
			email: formData.email ? '' : 'Email is required',
			password: formData.password ? '' : 'Password is required',
		};
		setErrors(newErrors);

		if (!newErrors.email && !newErrors.password) {
			try {
				const response = await fetch('http://localhost:4000/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				});
				if (response.status === 201) {
					const { result } = await response.json();
					localStorage.setItem('token', result);
					onLoginSuccess();
					navigate('/courses');
				} else {
					const data = await response.json();
					console.error(data);
				}
			} catch (error) {
				console.error('There was an error logging in', error);
			}
		}
	};

	return (
		<>
			<h3 className='login-title'>Login</h3>
			<div className='login-container'>
				<form onSubmit={handleSubmit}>
					<label>
						Email:
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Input text'
						/>
						{errors.email && <span className='error'>{errors.email}</span>}
					</label>
					<label>
						Password:
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Input text'
						/>
						{errors.password && (
							<span className='error'>{errors.password}</span>
						)}
					</label>
					<button type='submit'>Login</button>
				</form>
				<p>
					If you don't have an account you may{' '}
					<Link to='/registration'>Registration</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
