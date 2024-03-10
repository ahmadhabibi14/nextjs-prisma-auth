import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export function currentUser() {
  return Prisma.defineExtension((client) => {
    return client.$extends({
      model: {
        user: {
          async current() {
            const session = await getServerSession(authOptions);

            if (!session?.user?.email) return null;

            const user = await client.user.findUnique({
              where: { email: session.user.email },
            });

            return user;
          },
        },
      },
    });
  });
}
