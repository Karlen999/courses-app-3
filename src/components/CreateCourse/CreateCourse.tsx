import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { mockedAuthorsList } from '../../constants';
import { formatDuration } from '../../helpers/getCourseDuration';
import AddIcon from '../../assets/AddIcon.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import { v4 as uuidv4 } from 'uuid';
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

type CreateCourseProps = {
	addCourse: (course: any) => void;
};

const CreateCourse: React.FC<CreateCourseProps> = ({ addCourse }) => {
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
				id: uuidv4(),
				name: newAuthorName,
			};
			setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
			setNewAuthorName('');
		}
	};

	const handleSaveCourse = () => {
		if (validateFields()) {
			const newCourse = {
				id: uuidv4(),
				title,
				description,
				creationDate: new Date().toISOString(),
				duration,
				authors: courseAuthors.map((author) => author.id),
			};

			addCourse(newCourse);
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
					{errors.title && <div className='error'>{errors.title}</div>}

					<label className='course-input-label'>Description</label>
					<input
						className='course-input-description'
						placeholder='Input text'
						value={description}
						onChange={(e) => handleInputChange(e, setDescription)}
					/>
					{errors.description && (
						<div className='error'>{errors.description}</div>
					)}

					<h4 className='course-subtitle'>Duration</h4>
					<label className='course-input-label'>Duration</label>
					<div className='duration-container'>
						<input
							type='number'
							value={duration.toString()}
							onChange={(e) =>
								setDuration(Math.max(0, parseInt(e.target.value)))
							}
							className='course-input-duration'
							min='1'
						/>
						<span>{formatDuration(duration)} hours</span>
					</div>
					{errors.duration && <div className='error'>{errors.duration}</div>}

					<div className='course-authors-label'>Course Authors</div>

					<div className='author-name'>
						{courseAuthors.map((author) => (
							<AuthorItem
								key={author.id}
								name={author.name}
								onButtonClick={() => handleDeleteAuthor(author.id)}
								icon={DeleteIcon}
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
							<img src={AddIcon} alt='' />
						</button>
						<button
							className='delete-author-button'
							onClick={() => handleDeleteAuthor(selectedAuthorId || '')}
						>
							<img src={DeleteIcon} alt='' />
						</button>
					</div>
					{errors.title && <div className='error'>{errors.title}</div>}
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
