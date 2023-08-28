const BASE_URL = 'http://localhost:4000';

export const fetchCourses = async () => {
	const response = await fetch(`${BASE_URL}/courses/all`, {
		method: 'GET',
		headers: {
			Accept: '*/*',
		},
	});
	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to fetch courses');
	}
};

export const fetchAuthors = async () => {
	const response = await fetch(`${BASE_URL}/authors/all`, {
		method: 'GET',
		headers: {
			Accept: '*/*',
		},
	});
	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to fetch authors');
	}
};
