import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { mockedAuthorsList } from '../../constants';
import { formatDuration } from '../../helpers/getCourseDuration';
import './CreateCourse.css';

type Author = {
	id: string;
	name: string;
};

type Errors = {
	title?: string;
	description?: string;
	duration?: string;
};

const CreateCourse: React.FC = () => {
	const navigate = useNavigate();

	// State declarations with type definitions
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [duration, setDuration] = useState<number>(0);
	const [authors, setAuthors] = useState<Author[]>(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
	const [newAuthorName, setNewAuthorName] = useState<string>('');
	const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
	const [errors, setErrors] = useState<Errors>({});

	const validateFields = (): boolean => {
		const errors: Errors = {};

		if (title.length < 2)
			errors.title = 'Title should be at least 2 characters.';
		if (description.length < 2)
			errors.description = 'Description should be at least 2 characters.';
		if (duration <= 0)
			errors.duration = 'Duration should be more than 0 minutes.';

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const generateId = (): string => {
		return Math.random().toString(36).substr(2, 9);
	};

	// Event handlers with type definitions
	const handleInputChange = <T extends string | number>(
		e: ChangeEvent<HTMLInputElement>,
		setter: Dispatch<SetStateAction<T>>
	) => {
		const value =
			e.target.type === 'number' ? Number(e.target.value) : e.target.value;
		setter(value as T);
	};

	const handleAddAuthor = (authorId: string) => {
		const authorToAdd = authors.find((author) => author.id === authorId);
		if (authorToAdd) {
			setCourseAuthors((prevAuthors) => [...prevAuthors, authorToAdd]);
			setAuthors((prevAuthors) =>
				prevAuthors.filter((author) => author.id !== authorId)
			);
		}
	};

	const handleDeleteAuthor = (authorId: string) => {
		const authorToDelete = courseAuthors.find(
			(author) => author.id === authorId
		);
		if (authorToDelete) {
			setAuthors((prevAuthors) => [...prevAuthors, authorToDelete]);
			setCourseAuthors((prevAuthors) =>
				prevAuthors.filter((author) => author.id !== authorId)
			);
		}
	};

	const handleCreateAuthor = () => {
		if (newAuthorName.length >= 2) {
			const newAuthor: Author = {
				id: generateId(),
				name: newAuthorName,
			};
			setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
			setNewAuthorName('');
		}
	};

	const handleSaveCourse = () => {
		if (validateFields()) {
			navigate('/courses');
		}
	};

	return (
		<>
			<h3 className='course-title'>Course edit/create page</h3>
			<div className='course-container'>
				<div className='course-rectangle'>
					<h4 className='course-subtitle'>Main Info</h4>
					<label className='course-input-label'>Title</label>
					<input
						className='course-input-title'
						placeholder='Input text'
						value={title}
						onChange={(e) => handleInputChange(e, setTitle)}
					/>
					{errors.title && <div className='error-message'>{errors.title}</div>}

					<label className='course-input-label'>Description</label>
					<input
						className='course-input-description'
						placeholder='Input text'
						value={description}
						onChange={(e) => handleInputChange(e, setDescription)}
					/>
					{errors.description && (
						<div className='error-message'>{errors.description}</div>
					)}

					<h4 className='course-subtitle'>Duration</h4>
					<label className='course-input-label'>Duration</label>
					<input
						className='course-input-duration'
						placeholder='Input text'
						value={duration.toString()}
						onChange={(e) => handleInputChange(e, setDuration)}
						type='number'
					/>
					{errors.duration && (
						<div className='error-message'>{errors.duration}</div>
					)}

					<div className='course-authors-label'>Course Authors</div>

					<div className='course-authors-list'>
						{courseAuthors.map((author) => (
							<AuthorItem
								key={author.id}
								name={author.name}
								onButtonClick={() => handleDeleteAuthor(author.id)}
								buttonText='Delete'
							/>
						))}
					</div>

					<h4 className='course-subtitle'>Authors</h4>
					<label className='course-input-label'>Authors</label>
					<div className='authors-input-container'>
						<input
							className='course-input-author'
							placeholder='Input text'
							value={newAuthorName}
							onChange={(e) => setNewAuthorName(e.target.value)}
						/>
						<button onClick={handleCreateAuthor}>CREATE AUTHOR</button>
					</div>
					<h4 className='course-subtitle'>Authors List</h4>
					<select
						value={selectedAuthorId || ''}
						onChange={(e) => setSelectedAuthorId(e.target.value)}
						style={{ marginLeft: '80px', marginTop: '75px' }}
					>
						<option value=''>Select an author</option>
						{authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
					</select>
					<div className='author-buttons-container'>
						<button
							className='add-author-button'
							onClick={() => handleAddAuthor(selectedAuthorId || '')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='13'
								height='13'
								viewBox='0 0 13 13'
								fill='none'
							>
								<path
									d='M3.25 6.5H9.75M6.5 9.75V3.25'
									stroke='#333E48'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
						<button
							className='delete-author-button'
							onClick={() => handleDeleteAuthor(selectedAuthorId || '')}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='13'
								height='13'
								viewBox='0 0 13 13'
								fill='none'
							>
								<g clip-path='url(#clip0_6131_501)'>
									<path
										d='M11.375 3.23917C9.57125 3.06042 7.75667 2.96833 5.9475 2.96833C4.875 2.96833 3.8025 3.0225 2.73 3.13083L1.625 3.23917M4.60417 2.69208L4.72333 1.9825C4.81 1.46792 4.875 1.08333 5.79042 1.08333H7.20958C8.125 1.08333 8.19542 1.48958 8.27667 1.98792L8.39583 2.69208M10.2104 4.95083L9.85833 10.4054C9.79875 11.2558 9.75 11.9167 8.23875 11.9167H4.76125C3.25 11.9167 3.20125 11.2558 3.14167 10.4054L2.78958 4.95083M5.59542 8.9375H7.39917M5.14583 6.77083H7.85417'
										stroke='#333E48'
										stroke-width='1.5'
										stroke-linecap='round'
										stroke-linejoin='round'
									/>
								</g>
								<defs>
									<clipPath id='clip0_6131_501'>
										<rect width='13' height='13' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</button>
					</div>
					{errors.title && <div className='error-message'>{errors.title}</div>}
				</div>
				<button
					className='primary-standard-button cancel-button'
					onClick={() => navigate('/courses')}
				>
					CANCEL
				</button>

				<button
					className='primary-standard-button create-course-button'
					onClick={handleSaveCourse}
				>
					CREATE COURSE
				</button>
			</div>
			;
		</>
	);
};

export default CreateCourse;
