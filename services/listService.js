import axios, { auth, axiosURL } from '../constants/axios';

export const getCharactersService = async data => {
	try {
		let adding = '';
    
		if (data?.limit) {
			adding += '&limit=' + data.limit;
		}
    
		if (data?.offset) {
			adding += '&offset=' + data.offset;
		}

		const res = await axios.get(axiosURL.characters + adding).then(res => res);

		return {
			data : res.data.data,
			status: res.data.status
		};
	}
	catch (error) {
		return {
			status: false,
			error: error
		};
	}
};

export const getCharacterDetailService = async id => {
	try {
		const res = await axios.get(axiosURL.character + id + auth).then(res => res);

		console.log(res);

		return {
			data : res.data.data,
			status: res.data.status
		};
	}
	catch (error) {
		return {
			status: false,
			error: error
		};
	}
};

