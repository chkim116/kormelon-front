import axios from 'axios';
import { Post } from '../interfaces/post';

export const getCate = async () => {
  return await axios.get('/category');
};

export const postFetcher = async (data: Post, id?: string) => {
  id ? await axios.post(`/post/edit/${id}`, data) : await axios.post('/post/post', data);
};

export const postDeleteFetcher = async (id: string, category: string) => {
  await axios.get(`/post/del/${id}/${category}`);
};

export const postCategory = async (url: string, data: any) => {
  await axios.post(url, data);
};

export const delCategory = async (url: string) => {
  await axios.delete(url);
};
