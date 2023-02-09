import { z } from "zod";
import { Role } from "../../../utils/types";

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

  getUsersByRole: publicProcedure
    .input(z.object({ role: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.user.findMany({
        where: {
          /*eslint-disable */
          role: input.role as any,
        },
      });

      const id_value_formatted = users.map((item) => ({
        id: item.id,
        value: item.name as string,
      }));
      return id_value_formatted;
    }),

  askForActivation: protectedProcedure
    .input(z.object({ passportId: z.string() }))
    .mutation(({ input, ctx }) => {
      const checkForInactiveUser = void ctx.prisma.user.findUnique({
        where: { passportId: input.passportId },
      });
      if (checkForInactiveUser) {
        console.log("active", checkForInactiveUser);
        // apply logic to merge the inactive data and activate the new account
      }
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
    }),
});
