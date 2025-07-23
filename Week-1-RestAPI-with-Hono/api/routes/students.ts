import { Hono } from 'hono';
import drizzle from '../db/drizzle';
import { students } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import dayjs from 'dayjs';

const studentsRouter = new Hono();

studentsRouter.get('/', async (c) => {
  const allStudents = await drizzle.select().from(students);
  return c.json(allStudents);
});

studentsRouter.get('/:student_id', async (c) => {
  const student_id = c.req.param('student_id');
  const result = await drizzle.query.students.findFirst({
    where: eq(students.student_id, student_id),
  });
  if (!result) {
    return c.json({ message: 'Student not found' }, 404);
  }

    return c.json(result);
});

export default studentsRouter;
