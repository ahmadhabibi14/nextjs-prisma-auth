import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

const Me = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const current = await db.user.current();

  return (
    <div>
      {!user ? (
        <p>Not yet login</p>
      ) : (
        <div>
          <p>Username: {current?.username}</p>
          <p>Email: {current?.email}</p>
          <p>Full Name: {current?.fullName}</p>
        </div>
      )}
    </div>
  )
}

export default Me;