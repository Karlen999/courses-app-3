const BASE_URL = 'http://localhost:4000';
const getToken = () => localStorage.getItem('token');

export const addCourseAPI = async (courseData) => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/courses/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(courseData),
	});

	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to add the course');
	}
};

export const updateCourseAPI = async (courseId, courseData) => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(courseData),
	});

	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to add the course');
	}
};

export const logoutAPI = async () => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/logout`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to logout');
	}
};

export const fetchCourses = async () => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/courses/all`, {
		method: 'GET',
		headers: {
			Accept: '*/*',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to fetch courses');
	}
};

export const deleteCourseAPI = async (courseId) => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message || 'Failed to delete the course');
	}
};

export const fetchAuthors = async () => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/authors/all`, {
		method: 'GET',
		headers: {
			Accept: '*/*',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to fetch authors');
	}
};

export const addAuthorAPI = async (authorData) => {
	const token = getToken();
	const response = await fetch(`${BASE_URL}/authors/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(authorData),
	});

	const data = await response.json();
	if (data.successful) {
		return data.result;
	} else {
		throw new Error('Failed to add the author');
	}
};
