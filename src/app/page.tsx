import Link from "next/link";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Link href="/login">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white">
            Нэвтрэх
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Бүртгүүлэх
          </button>
        </Link>
      </main>
    </HydrateClient>
  );
}
