import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonClient from "./AuthButtonClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function AuthButtonServer() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButtonClient session={session} />;
}

export default AuthButtonServer;
