
export const uuid = () => {
	/*jshint bitwise:false */
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
};

export const store = (key, value) => {
  if (value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  let _value = localStorage.getItem(key);

  return _value && JSON.parse(_value) || [];
};
