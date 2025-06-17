import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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
        throw new Error("Email bvrtgelte baina");
      }

      const hashedPassword = await hash(input.password, 6);

      await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return { success: true };
    }),

  getName: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("Nevtreegv baina.");
    }
    return ctx.session.user.name;
  }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin baih ystoi");
    }

    const users = await ctx.db.user.findMany();
    return users;
  }),

  deleteUser: protectedProcedure
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin baih ystoi");
    }
    await ctx.db.user.delete({
      where: {
        email: input.email,
      },
    });
  }),

    updateToAdmin: protectedProcedure
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin baih ystoi");
    }
    await ctx.db.user.update({
      where: {
        email: input.email,
      },
      data: {
        role: "admin"
      },
    });
  }),

    updateToUser: protectedProcedure
  .input(
    z.object({
      email: z.string().email(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== "admin") {
      throw new Error("admin baih ystoi");
    }
    await ctx.db.user.update({
      where: {
        email: input.email,
      },
      data: {
        role: "user"
      }
    });
  }),
});
