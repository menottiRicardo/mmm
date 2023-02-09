import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const busRouter = createTRPCRouter({
  createBus: protectedProcedure
    .input(z.object({ plate: z.string(), driverId: z.string() }))
    .mutation(({ input, ctx }) => {
      const busCreated = ctx.prisma.bus.create({
        data: {
          plate: input.plate,
          route: "1",
          driverId: input.driverId,
        },
      });
      return busCreated;
    }),

  getAllBuses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bus.findMany();
  }),
});
