import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import AddConsoleForm from "@/components/AddConsoleForm";

export default async function AddConsolePage() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  return (
    <SideBar currentPath="/consoles">
      <AddConsoleForm />
    </SideBar>
  );
}
