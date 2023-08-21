import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

interface RegistrationProps {
	onRegistrationSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({
	onRegistrationSuccess,
}) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		name: '',
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
			name: formData.name ? '' : 'Name is required',
			email: formData.email ? '' : 'Email is required',
			password: formData.password ? '' : 'Password is required',
		};
		setErrors(newErrors);

		if (!newErrors.name && !newErrors.email && !newErrors.password) {
			try {
				const response = await fetch('http://localhost:4000/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				});

				if (response.status === 201) {
					onRegistrationSuccess();
					localStorage.setItem('username', formData.name);
					navigate('/login');
				} else {
					const data = await response.json();
					console.error(data);
				}
			} catch (error) {
				console.error('There was an error registering the user', error);
			}
		}
	};

	return (
		<>
			<h3 className='registration-title'>Registration</h3>
			<div className='registration-container'>
				<form onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Input text'
						/>
						{errors.name && <span className='error'>{errors.name}</span>}
					</label>
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
					<button type='submit'>Register</button>
				</form>
				<p>
					If you have an account you may <Link to='/login'>Login</Link>
				</p>
			</div>
		</>
	);
};

export default Registration;
