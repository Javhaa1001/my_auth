// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { hash } from "bcryptjs";

// export const authRouter = createTRPCRouter({
//   register: publicProcedure
//     .input(
//       z.object({
//         name: z.string(),
//         email: z.string().email(),
//         password: z.string().min(6),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const hashed = await hash(input.password, 10);
//       const user = await ctx.db.user.create({
//         data: {
//           name: input.name,
//           email: input.email,
//           password: hashed,
//         },
//       });

//       return user;
//     }),
// });
