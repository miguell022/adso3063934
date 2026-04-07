"use client";
import { Eye, PencilSimple, Trash, IconProps } from "@phosphor-icons/react";

export function ViewIcon(props: IconProps) {
  return <Eye size={20} {...props} />;
}

export function EditIcon(props: IconProps) {
  return <PencilSimple size={20} {...props} />;
}

export function DeleteIcon(props: IconProps) {
  return <Trash size={20} {...props} />;
}