"use client";
import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import { Menu, X, BookOpen, Brain, Zap } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/companions" className="nav-link">
              <BookOpen className="w-4 h-4 mr-2 inline" />
              Library
            </Link>
            <Link href="/my-journey" className="nav-link">
              My Journey
            </Link>
            <Link href="/subscription" className="nav-link">
              Pro
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <button className="btn-ghost">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="btn-gradient">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl border border-border",
                    userButtonPopoverActionButton: "hover:bg-muted",
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/" 
                className="block nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/companions" 
                className="block nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4 mr-2 inline" />
                Library
              </Link>
              <Link 
                href="/my-journey" 
                className="block nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Journey
              </Link>
              <Link 
                href="/subscription" 
                className="block nav-link py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pro
              </Link>
              
              <div className="pt-4 border-t border-border space-y-3">
                <SignedOut>
                  <SignInButton>
                    <button className="btn-ghost w-full justify-start">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="btn-gradient w-full">
                      Get Started
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Account</span>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "shadow-xl border border-border",
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;