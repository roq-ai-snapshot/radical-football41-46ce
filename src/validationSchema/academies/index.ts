import * as yup from 'yup';
import { playerValidationSchema } from 'validationSchema/players';
import { trainingGroupValidationSchema } from 'validationSchema/training-groups';

export const academyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  player: yup.array().of(playerValidationSchema),
  training_group: yup.array().of(trainingGroupValidationSchema),
});
