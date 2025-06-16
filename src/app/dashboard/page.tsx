
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    Сайн байна уу, {"  "}
     {session.user.name || session.user.email}
     </div>;
}