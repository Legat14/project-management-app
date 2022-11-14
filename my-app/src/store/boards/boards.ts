import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const GetBoards = createAsyncThunk<IGetBoardResponse, void>(
  'boards',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.get('boards');
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const CreateBoard = createAsyncThunk<IGetBoardResponse, ICreateBoardRequest>(
  'boards',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.post('boards');
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getBoardById = createAsyncThunk<ICreateBoardResponse, string>(
  'boards',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`boards/${request}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const UpdateBoardById = createAsyncThunk<ICreateBoardResponse, IUpdateBoardByIdRequest>(
  'boards',
  async function ({ boardId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.put(`boards/${boardId}`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const DeleteBoardById = createAsyncThunk<ICreateBoardResponse, string>(
  'boards',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: Response = await api.delete(`boards/${boardId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// TODO GetBoardsById

export const GetUserU = createAsyncThunk<ICreateBoardResponse, string>(
  'boards',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`boards/${boardId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
