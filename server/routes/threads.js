import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const pageSize = 10;

    // Get page number from URL
    const page = Number(req.query.page) || 1;

    // Calculate how many threads to skip
    const skip = (page - 1) * pageSize;

    // Get threads and total count at the same time
    const [threads, total] = await Promise.all([
      prisma.thread.findMany({
        skip,
        take: pageSize,

        // Keep existing orderBy
        orderBy: { createdAt: "desc" },

        // Keep existing include
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

    // Check if there are more threads
    const hasMore = total > page * pageSize;

    res.json({
      threads,
      total,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

export default router;