import * as yup from 'yup';
import { playerGroupValidationSchema } from 'validationSchema/player-groups';

export const trainingGroupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  academy_id: yup.string().nullable().required(),
  player_group: yup.array().of(playerGroupValidationSchema),
});
