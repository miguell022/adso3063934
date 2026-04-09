"use client"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import Link from "next/link"

export default function BackHomeButton() {
    return (
        // Boton reutilizable para volver al home desde pantallas auxiliares.
        <Link href="/" className="btn btn-outline mt-10 w-full hover:bg-white hover:text-black">
            <ArrowLeftIcon size={24} />
            Go Back Home
        </Link>
    )
}
