export const formatCreationDate = (date) => {
	const [month, day, year] = new Date(date).toLocaleDateString().split('/');
	return `${day}.${month}.${year}`;
};
