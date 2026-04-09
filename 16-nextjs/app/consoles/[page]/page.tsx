export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default async function ConsolesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  await params;
  redirect("/consoles");
}
