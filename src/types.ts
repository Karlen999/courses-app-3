export interface ApiResponse<T> {
	successful: boolean;
	result: T;
}

export type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type Author = {
	id: string;
	name: string;
};

export type RootState = {
	courses: Course[];
	authors: Author[];
	user: {
		isAuth: boolean;
		name: string;
		email: string;
		token: string;
		role?: 'admin' | 'user';
	};
};

export type CourseData = {
	title: string;
	description: string;
	duration: number;
	authors: Author[];
};
