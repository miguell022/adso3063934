import { redirect } from "next/navigation";

// Esta ruta vieja ya no debe ejecutar borrados por navegacion.
export default async function DeleteGamePage() {
  redirect("/games");
}
