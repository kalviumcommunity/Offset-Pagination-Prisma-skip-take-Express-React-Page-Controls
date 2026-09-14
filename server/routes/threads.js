import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pageSize = 10;

    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
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

    const hasMore = total > page * pageSize;

    res.json({
      threads,
      total,
      hasMore,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch threads",
    });
  }
});

export default router;