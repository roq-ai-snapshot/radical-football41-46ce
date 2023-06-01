import { PlayerGroupInterface } from 'interfaces/player-group';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  coach_id: string;
  performance_data?: string;
  development_goals?: string;
  player_group?: PlayerGroupInterface[];
  training_plan?: TrainingPlanInterface[];
  user_player_user_idTouser?: UserInterface;
  academy?: AcademyInterface;
  user_player_coach_idTouser?: UserInterface;
  _count?: {
    player_group?: number;
    training_plan?: number;
  };
}
