import * as yup from 'yup';
import { playerGroupValidationSchema } from 'validationSchema/player-groups';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';

export const playerValidationSchema = yup.object().shape({
  performance_data: yup.string(),
  development_goals: yup.string(),
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
  player_group: yup.array().of(playerGroupValidationSchema),
  training_plan: yup.array().of(trainingPlanValidationSchema),
});
