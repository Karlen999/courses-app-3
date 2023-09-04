const BASE_URL = 'http://localhost:4000';
const getToken = () => localStorage.getItem('token');

export const addCourseAPI = async (courseData) => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/courses/add`, {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseData),
		});

		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to add the course');
		}
	} catch (error) {
		console.error('Error while adding the course:', error);
	}
};

export const updateCourseAPI = async (courseId, courseData) => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseData),
		});

		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to add the course');
		}
	} catch (error) {
		console.error('Error while updating the course:', error);
	}
};

export const logoutAPI = async () => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/logout`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});

		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to logout');
		}
	} catch (error) {
		console.error('Error while logout:', error);
	}
};

export const fetchCourses = async () => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/courses/all`, {
			method: 'GET',
			headers: {
				Accept: '*/*',
				Authorization: token,
			},
		});
		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to fetch courses');
		}
	} catch (error) {
		console.error('Error while fetching the course:', error);
	}
};

export const deleteCourseAPI = async (courseId) => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});

		if (!response.ok) {
			const data = await response.json();
			console.error(data.message || 'Failed to delete the course');
		}
	} catch (error) {
		console.error('Error while deleting the course:', error);
	}
};

export const fetchAuthors = async () => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/authors/all`, {
			method: 'GET',
			headers: {
				Authorization: token,
				Accept: '*/*',
			},
		});
		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to fetch authors');
		}
	} catch (error) {
		console.error('Error while fetching the authors:', error);
	}
};

export const addAuthorAPI = async (authorData) => {
	try {
		const token = getToken();
		const response = await fetch(`${BASE_URL}/authors/add`, {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(authorData),
		});

		const data = await response.json();
		if (data.successful) {
			return data.result;
		} else {
			console.error('Failed to add the author');
		}
	} catch (error) {
		console.error('Error while adding the author:', error);
	}
};
