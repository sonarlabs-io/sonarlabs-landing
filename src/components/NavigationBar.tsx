"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Info, Home, FolderClosed, Bell, LogOut, User, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { getThemeStyles } from '@/styles/components';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from 'next/image';
import { PencilLine } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';
import { IntroModal } from './IntroModal';

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const themeStyles = getThemeStyles(theme);

  const navItems = [
    { name: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
    { name: "Score", icon: <Sparkles className="h-4 w-4" />, path: "/score" },
    { name: "Research", icon: <FolderClosed className="h-4 w-4" />, path: "/research" },
    { name: "Watchlist", icon: <Bell className="h-4 w-4" />, path: "/watchlist" }
  ];

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleLogoClick = (e: any) => {
    e.preventDefault();
    if (pathname === '/') {
      router.push('/?reset=true');
    } else {
      router.push('/');
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const hasSeenIntro = localStorage.getItem('hasSeenIntro') === 'true';
    if (token && !hasSeenIntro) {
      setIsIntroModalOpen(true);
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
    router.push('/auth');
    setIsMenuOpen(false);
  };

  return (
    <nav className={themeStyles.nav.wrapper}>
      <div className={themeStyles.nav.container}>
        {/* Logo */}
        <Link
          href="/"
          className={themeStyles.nav.logoContainer}
          onClick={handleLogoClick}
        >
          <Image
            src="/images/logo.svg"
            alt="SONAR"
            width={120}  // Adjust these values to fit your navbar height
            height={43}  // Maintain the aspect ratio 1200:430
            priority
            className="object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1">
          <div className={themeStyles.nav.content}>
            <ul className={themeStyles.nav.list}>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className={cn(
                      themeStyles.nav.item,
                      pathname === item.path && themeStyles.nav.itemActive
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Profile - Desktop */}
        <div className="hidden lg:flex items-center">
          <div className={themeStyles.nav.profile}>
            {user ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsIntroModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Info className="h-4 w-4" />
                  About
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFeedbackOpen(true)}
                  className="flex items-center gap-2"
                >
                  <PencilLine className="h-4 w-4" />
                  Feedback
                </Button>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/auth">
                <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </div> 

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden ${theme === 'dark' ? 'bg-[#333333]' : 'bg-white'} border-b`}>
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-md w-full",
                  pathname === item.path 
                    ? themeStyles.nav.itemActive
                    : themeStyles.nav.item
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
              {user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsIntroModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    <span>About</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsFeedbackOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <PencilLine className="h-4 w-4 mr-2" />
                    <span>Feedback</span>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Button>
                </>
              )}
          </div>
        </div>
        )}
        <FeedbackModal 
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
        <IntroModal
        // isOpen={isIntroModalOpen}
          isOpen={false}
          onClose={() =>
          setIsIntroModalOpen(false)
          }
        />
    </nav>
  );
}