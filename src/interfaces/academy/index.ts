import { PlayerInterface } from 'interfaces/player';
import { TrainingGroupInterface } from 'interfaces/training-group';
import { UserInterface } from 'interfaces/user';

export interface AcademyInterface {
  id?: string;
  name: string;
  user_id: string;
  player?: PlayerInterface[];
  training_group?: TrainingGroupInterface[];
  user?: UserInterface;
  _count?: {
    player?: number;
    training_group?: number;
  };
}
