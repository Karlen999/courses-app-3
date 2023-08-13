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
				placeholder='Search by title or id'
			/>
			<Button onClick={handleSearch}>Search</Button>
		</div>
	);
};

export default SearchBar;
