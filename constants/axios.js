import axios from 'axios';

export const baseURL = 'http://gateway.marvel.com';
export default axios.create({ baseURL });
export const hash = '4cb9e6da3fde269c1fd7010e28a48167';
export const publicKey = 'fd6a3429f585519be439a72203152a1a';
export const auth = '?ts=1&apikey=' + publicKey + '&hash=' + hash;

export const axiosURL = {
	characters: '/v1/public/characters' + auth,
	character: '/v1/public/characters/',
};


