import AccessDenied from "@ext/components/access-denied";
import { options } from "@ext/lib/auth";
import { getServerSession } from "next-auth";

const Protected = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return <AccessDenied />
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </p>
    </>
  )
}

export default Protected;