import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingResourceValidationSchema } from 'validationSchema/training-resources';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId } = await getServerSession(req);
  await prisma.training_resource
    .withAuthorization({ userId: roqUserId })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTrainingResourceById();
    case 'PUT':
      return updateTrainingResourceById();
    case 'DELETE':
      return deleteTrainingResourceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingResourceById() {
    const data = await prisma.training_resource.findFirst(convertQueryToPrismaUtil(req.query, 'training_resource'));
    return res.status(200).json(data);
  }

  async function updateTrainingResourceById() {
    await trainingResourceValidationSchema.validate(req.body);
    const data = await prisma.training_resource.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTrainingResourceById() {
    const data = await prisma.training_resource.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
