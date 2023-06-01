import axios from 'axios';
import queryString from 'query-string';
import { PlayerGroupInterface } from 'interfaces/player-group';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerGroups = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerGroup = async (playerGroup: PlayerGroupInterface) => {
  const response = await axios.post('/api/player-groups', playerGroup);
  return response.data;
};

export const updatePlayerGroupById = async (id: string, playerGroup: PlayerGroupInterface) => {
  const response = await axios.put(`/api/player-groups/${id}`, playerGroup);
  return response.data;
};

export const getPlayerGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerGroupById = async (id: string) => {
  const response = await axios.delete(`/api/player-groups/${id}`);
  return response.data;
};
