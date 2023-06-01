import * as yup from 'yup';

export const trainingPlanValidationSchema = yup.object().shape({
  group_id: yup.string(),
  title: yup.string().required(),
  description: yup.string(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  coach_id: yup.string().nullable().required(),
  player_id: yup.string().nullable(),
});
