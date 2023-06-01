import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getTrainingResourceById } from 'apiSdk/training-resources';
import { Error } from 'components/error';
import { TrainingResourceInterface } from 'interfaces/training-resource';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function TrainingResourceViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrainingResourceInterface>(
    () => (id ? `/training-resources/${id}` : null),
    () =>
      getTrainingResourceById(id, {
        relations: [,],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Training Resource Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              title: {data?.title}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              type: {data?.type}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              content: {data?.content}
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_resource',
  operation: AccessOperationEnum.READ,
})(TrainingResourceViewPage);
