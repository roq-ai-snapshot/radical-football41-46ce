import { UserInterface } from 'interfaces/user';
import { PlayerInterface } from 'interfaces/player';

export interface TrainingPlanInterface {
  id?: string;
  coach_id: string;
  player_id?: string;
  group_id?: string;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;

  user?: UserInterface;
  player?: PlayerInterface;
  _count?: {};
}
