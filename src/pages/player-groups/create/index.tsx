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
import { createPlayerGroup } from 'apiSdk/player-groups';
import { Error } from 'components/error';
import { playerGroupValidationSchema } from 'validationSchema/player-groups';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { TrainingGroupInterface } from 'interfaces/training-group';
import { getPlayers } from 'apiSdk/players';
import { getTrainingGroups } from 'apiSdk/training-groups';
import { PlayerGroupInterface } from 'interfaces/player-group';

function PlayerGroupCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlayerGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlayerGroup(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlayerGroupInterface>({
    initialValues: {
      player_id: (router.query.player_id as string) ?? null,
      group_id: (router.query.group_id as string) ?? null,
    },
    validationSchema: playerGroupValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Player Group
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'player_id'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<TrainingGroupInterface>
            formik={formik}
            name={'group_id'}
            label={'group_id'}
            placeholder={'Select Training Group'}
            fetcher={getTrainingGroups}
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
  entity: 'player_group',
  operation: AccessOperationEnum.CREATE,
})(PlayerGroupCreatePage);
