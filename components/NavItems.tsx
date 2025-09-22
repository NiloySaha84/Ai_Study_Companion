"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { Home, BookOpen, User } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Library", href: "/companions", icon: BookOpen },
  { label: "My Journey", href: "/my-journey", icon: User },
]

const NavItems = () => {
  const pathname = usePathname()
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link 
          href={href} 
          key={label} 
          className={cn(
            "nav-link flex items-center px-3 py-2 rounded-lg transition-all duration-200",
            pathname === href && 'nav-link-active bg-primary/10 text-primary'
          )}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default NavItems;