import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

const PAGE_SIZE = 10;

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const skip = (page - 1) * PAGE_SIZE;
    const take = PAGE_SIZE;

    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      }),
      prisma.thread.count(),
    ]);

    const hasMore = total > page * PAGE_SIZE;

    res.json({ threads, total, hasMore });
  } catch (error) {
    next(error);
  }
});

export default router;