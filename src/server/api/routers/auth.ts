import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { hash } from "bcryptjs";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
       const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error ("Email bvrtgelte baina")
      }

      const hashedPassword = await hash(input.password, 6);

      await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return {success: true};
    }),

    getName: protectedProcedure.query(({ ctx }) => {
      if (!ctx.session.user) {
        throw new Error("Nevtreegv baina.");
      }
      return ctx.session.user.name;
  }),


});
