import db from "@ext/lib/db";
import { redirect } from "next/navigation";

const Me = async () => {
  const user = await db.user.current();
  if (!user) redirect("/auth/signin");

  console.log({user});
  return (
    <div>
      <p>Signed in as {user.email}</p>
    </div>
  )
}

export default Me;