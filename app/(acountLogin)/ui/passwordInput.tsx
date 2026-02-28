"use client";

import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visivel, setVisivel] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={visivel ? "text" : "password"}
          className={cn("pr-10 text-sidebar", className)}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          aria-controls={props.id}
          aria-pressed={visivel}
          className={cn(
            "absolute inset-y-0 right-0 flex items-center px-3",
            "text-white/40 transition-colors hover:text-white/80",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-blue-400 focus-visible:ring-offset-1 rounded-r-md"
          )}
          tabIndex={0}
        >
          {visivel ? (
            <EyeOff size={16} aria-hidden="true" />
          ) : (
            <Eye size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };