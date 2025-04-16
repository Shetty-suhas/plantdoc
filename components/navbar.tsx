"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLeaf } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { NeoButton } from "./ui/neo-button";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  const linkClass =
    "px-4 py-2 font-bold transition-all hover:-translate-y-0.5 active:translate-y-0.5";
  const activeLinkClass =
    "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#F3F707]";
  const inactiveLinkClass = "hover:bg-gray-100 rounded-lg";

  const NavLinks = () => (
    <>
      <Link
        href="/"
        className={cn(
          linkClass,
          isActive("/") ? activeLinkClass : inactiveLinkClass
        )}
      >
        Home
      </Link>
      <Link
        href="/encyclopedia"
        className={cn(
          linkClass,
          isActive("/encyclopedia") ? activeLinkClass : inactiveLinkClass
        )}
      >
        Encyclopedia
      </Link>
      {/* <Link
        href="/diagnosis-result"
        className={cn(
          linkClass,
          isActive("/diagnosis-result")
            ? activeLinkClass
            : inactiveLinkClass
        )}
      >
        Diagnosis
      </Link> */}
    </>
  );

  const AuthSection = () => (
    <div className="flex items-center gap-4">
      {user && (
        <NeoButton
          variant="outline"
          onClick={logout}
          className="flex items-center gap-2 text-sm"
        >
          <span>Logout</span>
          <LogOut size={16} />
        </NeoButton>
      )}
    </div>
  );

  return (
    <nav className="border-b-2 border-black bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold transition-transform hover:-translate-y-0.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#F3F707] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FaLeaf className="text-black" size={24} />
          </div>
          <span className="pl-1 text-xl font-bold leading-tight">PlantDoc</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <NavLinks />
          <AuthSection />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute right-4 top-4 rounded-lg border-2 border-black p-2 transition-all hover:-translate-y-0.5 hover:bg-gray-100 active:translate-y-0.5"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col items-center gap-4 p-4">
            <NavLinks />
            <AuthSection />
          </div>
        </div>
      )}
    </nav>
  );
}
