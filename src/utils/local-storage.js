export const getLocalStorage = name => {
	const data = localStorage.getItem(name);
	return JSON.parse(data);
};

export const setLocalStorage = (name, dataSource) => {
	const data = JSON.stringify(dataSource);
	localStorage.setItem(name, data);
};
