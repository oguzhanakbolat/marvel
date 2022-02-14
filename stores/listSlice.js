import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getCharactersService, getCharacterDetailService } from '../services/listService.js';

const initialState = {
	list: [],
	count: 0,
	limit: 30,
	character: {},
	scrollBottom: true,
	offset: 0,
	total: 0,
	loading: false,
	error: ''
};

export const getCharacterListAsync = createAsyncThunk(
	'stock/getCharacterListAsync',
	async data => {
		const res =  await getCharactersService(data);
		return res;
	}
);

export const getCharacterDetailAsync = createAsyncThunk(
	'stock/getCharacterDetailAsync',
	async data => {
		const res =  await getCharacterDetailService(data);
		return res;
	}
);

export const listSlice = createSlice({
	name: 'setting',

	initialState,

	reducers: {
		setScrollBottom(state, action) {
			state.scrollBottom = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getCharacterListAsync.pending, state => {
			state.loading = true;
		});

		builder.addCase(getCharacterListAsync.fulfilled, (state, action) => {
			if (action.payload.status ===  'Ok') {
				const currentState = current(state);
				state.error = '';
				state.list = [...currentState.list, ...action.payload.data.results];
				state.offset = currentState.offset + currentState.list.length;
				state.total = action.payload.data.total;
				state.count = action.payload.data.count;
			}
			else {
				state.error = action.payload.error;
			}

			state.loading = false;
			state.scrollBottom = false;
		});

		builder.addCase(getCharacterListAsync.rejected, state => {
			state.loading = false;
		});

		builder.addCase(getCharacterDetailAsync.pending, state => {
			state.loading = true;
		});

		builder.addCase(getCharacterDetailAsync.fulfilled, (state, action) => {
			if (action.payload.status ===  'Ok') {
				state.error = '';
				state.character = action.payload.data.results[0];
			}
			else {
				state.error = action.payload.error;
			}

			state.loading = false;
			state.scrollBottom = false;
		});

		builder.addCase(getCharacterDetailAsync.rejected, state => {
			state.loading = false;
		});
	},
});

export const { setScrollBottom } = listSlice.actions;
export default listSlice.reducer;
