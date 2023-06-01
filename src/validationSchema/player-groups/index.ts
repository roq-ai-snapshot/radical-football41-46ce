import * as yup from 'yup';

export const playerGroupValidationSchema = yup.object().shape({
  player_id: yup.string().nullable().required(),
  group_id: yup.string().nullable().required(),
});
