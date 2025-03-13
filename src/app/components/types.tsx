"use client";
import { Type } from "../types/common";
interface TypesProps {
  types: Type[];
  updateTypes: (t: Type) => void;
  selectTypes: string[];
}
export default function Types({ types, updateTypes, selectTypes }: TypesProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      Types:
      {types.map((type) => (
        <button
          className={`border p-4 m-2 ${
            selectTypes.find((t) => t === type.name)
              ? "bg-blue-500 text-white"
              : ""
          }`}
          key={type.name}
          onClick={() => updateTypes(type)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
}
