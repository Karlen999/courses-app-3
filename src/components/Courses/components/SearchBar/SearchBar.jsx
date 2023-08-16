import React, { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = () => {
		onSearch(searchQuery);
	};

	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className='search-bar'>
			<Input
				value={searchQuery}
				onChange={handleChange}
				placeholder='Input text'
			/>
			<Button buttonText='Search' onClick={handleSearch} />
		</div>
	);
};

export default SearchBar;
