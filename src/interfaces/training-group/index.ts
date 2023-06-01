import { PlayerGroupInterface } from 'interfaces/player-group';
import { AcademyInterface } from 'interfaces/academy';

export interface TrainingGroupInterface {
  id?: string;
  academy_id: string;
  name: string;
  player_group?: PlayerGroupInterface[];
  academy?: AcademyInterface;
  _count?: {
    player_group?: number;
  };
}
