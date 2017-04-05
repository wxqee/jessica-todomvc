export function uuid() {
	//GUID?
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
}

export function store(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export const isCompletedMode = () => {
	return location.hash.indexOf('completed') > 0;
}

export const isActiveMode = () => {
	return location.hash.indexOf('active') > 0;
}