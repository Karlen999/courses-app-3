import { SET_AUTHORS, SAVE_AUTHOR, DELETE_AUTHOR } from './types';

export const setAuthors = (authors) => ({
	type: SET_AUTHORS,
	payload: authors,
});

export const saveAuthor = (author) => ({
	type: SAVE_AUTHOR,
	payload: author,
});

export const deleteAuthor = (authorId) => ({
	type: DELETE_AUTHOR,
	payload: authorId,
});
