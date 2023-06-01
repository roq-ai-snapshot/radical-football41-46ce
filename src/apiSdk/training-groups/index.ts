import axios from 'axios';
import queryString from 'query-string';
import { TrainingGroupInterface } from 'interfaces/training-group';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingGroups = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingGroup = async (trainingGroup: TrainingGroupInterface) => {
  const response = await axios.post('/api/training-groups', trainingGroup);
  return response.data;
};

export const updateTrainingGroupById = async (id: string, trainingGroup: TrainingGroupInterface) => {
  const response = await axios.put(`/api/training-groups/${id}`, trainingGroup);
  return response.data;
};

export const getTrainingGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingGroupById = async (id: string) => {
  const response = await axios.delete(`/api/training-groups/${id}`);
  return response.data;
};
