import { Hono } from 'hono';
import drizzle from '../db/drizzle';
import { students } from '../db/schema';
import { eq } from 'drizzle-orm';
import { success, z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import dayjs from 'dayjs';

const studentsRouter = new Hono();

studentsRouter.get('/', async (c) => {
  const allStudents = await drizzle.select().from(students);
  return c.json(allStudents);
});

studentsRouter.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await drizzle.query.students.findFirst({
    where: eq(students.id, id),
  });
  if (!result) {
    return c.json({ message: 'Student not found' }, 404);
  }
  return c.json(result);
});

studentsRouter.post('/', 
  zValidator(
    "json",
    z.object({
        firstname: z.string().min(1).max(30),
        lastname: z.string().min(1).max(30),
        student_id: z.string().min(1).max(10),
        birthday: z.string().min(1).max(50).optional(),
        gender: z.string().min(1).max(10),
    })
  ),
    async (c) => {
        const { firstname, lastname, student_id, birthday, gender } = c.req.valid('json');
        const result = await drizzle.insert(students).values({
            firstname,
            lastname,
            student_id,
            birthday,
            gender,
        }).returning();
        return c.json({ success: true, student: result[0] }, 201);
    }
);

studentsRouter.patch('/:id', zValidator("json", z.object({
  firstname: z.string().max(30).optional(),
  lastname: z.string().max(30).optional(),
  student_id: z.string().max(10).optional(),
  birthday: z.string().max(50).optional(),
  gender: z.string().max(10).optional(),
  })),
  async (c) => {
    const id = Number(c.req.param('id'));
    const data = c.req.valid('json');
    const updated = await drizzle.update(students).set(data).where(eq(students.id, id)).returning();
    if (updated.length === 0) {
      return c.json({ message: 'Student not found' }, 404);
    }
    return c.json({ success: true, student: updated[0] });
  }
);

export default studentsRouter;
