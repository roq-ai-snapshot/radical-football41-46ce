import * as yup from 'yup';

export const trainingResourceValidationSchema = yup.object().shape({
  title: yup.string().required(),
  type: yup.string().required(),
  content: yup.string().required(),
});
