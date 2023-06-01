import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTrainingGroup } from 'apiSdk/training-groups';
import { Error } from 'components/error';
import { trainingGroupValidationSchema } from 'validationSchema/training-groups';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AcademyInterface } from 'interfaces/academy';
import { getPlayers } from 'apiSdk/players';
import { PlayerInterface } from 'interfaces/player';
import { getAcademies } from 'apiSdk/academies';
import { TrainingGroupInterface } from 'interfaces/training-group';

function TrainingGroupCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingGroup(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingGroupInterface>({
    initialValues: {
      name: '',
      academy_id: (router.query.academy_id as string) ?? null,
      player_group: [],
    },
    validationSchema: trainingGroupValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Training Group
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<AcademyInterface>
            formik={formik}
            name={'academy_id'}
            label={'academy_id'}
            placeholder={'Select Academy'}
            fetcher={getAcademies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_group',
  operation: AccessOperationEnum.CREATE,
})(TrainingGroupCreatePage);
