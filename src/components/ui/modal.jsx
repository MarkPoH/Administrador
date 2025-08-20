import React from "react";
import { cn } from "@/lib/utils";

export function Modal({ open, onClose, title, children, className }) {
  if (!open) return null;
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40", className)}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>}
        {children}
      </div>
    </div>
  );
}