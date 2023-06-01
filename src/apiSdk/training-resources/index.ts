import axios from 'axios';
import queryString from 'query-string';
import { TrainingResourceInterface } from 'interfaces/training-resource';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingResources = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-resources${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingResource = async (trainingResource: TrainingResourceInterface) => {
  const response = await axios.post('/api/training-resources', trainingResource);
  return response.data;
};

export const updateTrainingResourceById = async (id: string, trainingResource: TrainingResourceInterface) => {
  const response = await axios.put(`/api/training-resources/${id}`, trainingResource);
  return response.data;
};

export const getTrainingResourceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-resources/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingResourceById = async (id: string) => {
  const response = await axios.delete(`/api/training-resources/${id}`);
  return response.data;
};
