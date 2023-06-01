import { PlayerInterface } from 'interfaces/player';
import { TrainingGroupInterface } from 'interfaces/training-group';

export interface PlayerGroupInterface {
  id?: string;
  player_id: string;
  group_id: string;

  player?: PlayerInterface;
  training_group?: TrainingGroupInterface;
  _count?: {};
}
