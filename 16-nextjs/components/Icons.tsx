"use client";
import { Eye, PencilSimple, Trash, IconProps } from "@phosphor-icons/react";

// Wrappers pequeños para reutilizar los mismos iconos del CRUD en toda la app.
export function ViewIcon(props: IconProps) {
  return <Eye size={20} {...props} />;
}

export function EditIcon(props: IconProps) {
  return <PencilSimple size={20} {...props} />;
}

export function DeleteIcon(props: IconProps) {
  return <Trash size={20} {...props} />;
}
