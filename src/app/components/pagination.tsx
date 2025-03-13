"use client";
interface PaginationProps {
  previous: null | string;
  next: null | string;
  updatePage: (n: number) => void;
}
export default function Pagination({
  previous = null,
  next = null,
  updatePage,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 py-4">
      {previous && (
        <button
          onClick={() => {
            updatePage(-1);
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          previous
        </button>
      )}
      {next && (
        <button
          onClick={() => {
            updatePage(1);
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          next
        </button>
      )}
    </div>
  );
}
