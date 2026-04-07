import { redirect } from "next/navigation";

export default async function DeleteConsolePage() {
  redirect("/consoles");
}
