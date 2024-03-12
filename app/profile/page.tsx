import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { User } from "@/types/user";

const Me = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const current = await db.user.current() as User;

  return (
    <div>
      {!user ? (
        <p>Not yet login</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs py-0.5 px-3 bg-amber-500/10 text-amber-600 w-fit rounded-full">Username</span>
            <span>@{current?.username}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs py-0.5 px-3 bg-amber-500/10 text-amber-600 w-fit rounded-full">Full Name</span>
            <span>{current?.fullName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs py-0.5 px-3 bg-amber-500/10 text-amber-600 w-fit rounded-full">Email</span>
            <span>{current?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Me;
