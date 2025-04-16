import { cn } from "@/lib/utils";
import { type ClassValue } from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  className?: string | undefined;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function NeoButton({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 font-bold border-2 border-black transition-all hover:-translate-y-0.5 active:translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

  const variants = {
    primary: "bg-[#F3F707] hover:bg-[#E6EA00] text-black",
    secondary: "bg-white hover:bg-gray-100 text-black",
    outline: "bg-transparent hover:bg-gray-100 text-black",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
