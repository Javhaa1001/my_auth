"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import React, { useEffect } from "react";
import { UserComponent } from "../_components/user";


export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [refresh, setRefresh] = React.useState(false);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = api.auth.getUsers.useQuery(undefined, {
    enabled: status === "authenticated"
  });

  useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/login");
    } else if(session?.user.role !== "admin") {
        router.push("/dashboard");
    }
  }, [status, session?.user.role, router])

  const handleRefetch = async () => {
    const result = await refetch();
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <center>
        <h1 className="text-[32px] font-bold"> Admin page</h1>
        <p>Hereglecid:</p>
        <ul className="mt-[50px]">
          {users?.map((user) => (
            <UserComponent
              key={user.email}
              name={user.name ?? ""}
              email={user.email ?? ""}
              role={user.role ?? ""}
              refresh={refresh}
              refreshPage={() => setRefresh((prev) => !prev)}
              handleRefetch={() => handleRefetch()}
            />
          ))}
        </ul>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
          className="mt-[50px] rounded-full bg-red-500 px-10 py-3 font-semibold transition hover:bg-red-700"
        >
          Logout
        </button>
      </center>
    </div>
  );
}
