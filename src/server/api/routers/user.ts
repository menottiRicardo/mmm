import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  askForActivation: protectedProcedure
    .input(z.object({ passportId: z.string() }))
    .mutation(({ input, ctx }) => {
      const checkForInactiveUser = ctx.prisma.user.findUnique({
        where: passportId,
      });
      if (checkForInactiveUser) {
        // apply logic to merge the inactive data and activate the new account
      }
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
    }),
});
