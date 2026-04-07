import Link from "next/link";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; // Ejemplo: '/games' o '/consoles'
  cleanUrl?: boolean; // Si es true, la URL será limpia: '/games/1'
};

export default function Paginator({ currentPage, totalPages, baseUrl = "", cleanUrl = false }: PaginatorProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const href = cleanUrl
          ? `${baseUrl}/${page}`
          : `${baseUrl}?page=${page}`;
        return (
          <Link
            key={page}
            href={href}
            className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-ghost"}`}
            prefetch={false}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
