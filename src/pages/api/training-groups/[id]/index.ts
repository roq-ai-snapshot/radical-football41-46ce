import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingGroupValidationSchema } from 'validationSchema/training-groups';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.training_group
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTrainingGroupById();
    case 'PUT':
      return updateTrainingGroupById();
    case 'DELETE':
      return deleteTrainingGroupById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingGroupById() {
    const data = await prisma.training_group.findFirst(convertQueryToPrismaUtil(req.query, 'training_group'));
    return res.status(200).json(data);
  }

  async function updateTrainingGroupById() {
    await trainingGroupValidationSchema.validate(req.body);
    const data = await prisma.training_group.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTrainingGroupById() {
    const data = await prisma.training_group.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
