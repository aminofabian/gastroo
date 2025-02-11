"use client";
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Bell } from 'lucide-react';

// Add keyframe animation for marquee
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
`;

// Add style tag to head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = marqueeStyles;
  document.head.appendChild(style);
}

interface BaseNavItem {
  title: string;
  link: string;
}

interface StandardNavItem extends BaseNavItem {
  type?: never;
  children?: StandardNavItem[];
}

interface FeaturedNavItem extends BaseNavItem {
  type: 'featured';
  image: string;
  description: string;
  items: {
    title: string;
    link: string;
    description: string;
  }[];
}

type NavItem = StandardNavItem | FeaturedNavItem;

const NavItem = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFeatured = (child: NavItem): child is FeaturedNavItem => {
    return 'type' in child && child.type === 'featured';
  };

  const isStandard = (child: NavItem): child is StandardNavItem => {
    return !('type' in child);
  };

  return (
    <li 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href={item.link}
        className="block px-4 py-2 font-merriweather text-[#003366] hover:text-[#0f5a5e]/80 transition-colors"
      >
        {item.title}
      </a>
      
      {(isStandard(item) && item.children || isFeatured(item)) && isOpen && (
        <ul className="absolute left-0 top-[calc(100%-2px)] bg-white shadow-xl min-w-[800px] overflow-hidden border-t-2 border-[#0f5a5e]/30">
          {isStandard(item) && item.children?.map((child, idx) => (
            <li key={idx} className="border-b border-gray-100 last:border-none">
              {isStandard(child) && child.children ? (
                <div className="relative group/sub">
                  <a 
                    href={child.link}
                    className="block px-6 py-3 uppercase text-[14px] font-merriweather text-gray-700 hover:bg-[#0f5a5e]/5 hover:text-[#003366] transition-colors duration-200 flex justify-between items-center"
                  >
                    {child.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul className="absolute left-full top-0 bg-white shadow-xl min-w-[240px] hidden group-hover/sub:block border border-gray-100">
                    {child.children.map((subChild, subIdx) => (
                      <li key={subIdx} className="border-b border-gray-100 last:border-none">
                        <a 
                          href={subChild.link}
                          className="block px-6 py-3 uppercase text-[14px] font-merriweather text-gray-700 hover:bg-[#0f5a5e]/5 hover:text-[#003366] transition-colors duration-200"
                        >
                          {subChild.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a 
                  href={child.link}
                  className="block px-6 py-3 uppercase text-[14px] font-merriweather text-gray-700 hover:bg-[#0f5a5e]/5 hover:text-[#003366] transition-colors duration-200"
                >
                  {child.title}
                </a>
              )}
            </li>
          ))}
          {isFeatured(item) && (
            <li className="border-b border-gray-100 last:border-none">
              <div className="flex">
                {/* Image and description section - 1/3 width */}
                <div className="w-1/3 p-6 bg-gray-50">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img 
                      src={item.image} 
                      alt="Membership Feature"
                      className="object-cover GSK"
                    />
                  </div>
                  <p className="text-sm text-gray-600 font-merriweather">
                    {item.description}
                  </p>
                </div>
                {/* Menu items section - 2/3 width */}
                <div className="w-2/3 p-6 grid grid-cols-2 gap-4">
                  {item.items.map((menuItem, itemIdx) => (
                    <a 
                      key={itemIdx}
                      href={menuItem.link}
                      className="group/item block p-3 hover:bg-[#0f5a5e]/5 GSK transition-colors"
                    >
                      <h4 className="font-merriweather text-[#003366] font-semibold mb-1 group-hover/item:text-[#0f5a5e]">
                        {menuItem.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {menuItem.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </li>
          )}
        </ul>
      )}
    </li>
  );
};

const MobileMenu = ({ navItems, isOpen, setIsOpen }: { 
  navItems: NavItem[], 
  isOpen: boolean, 
  setIsOpen: (isOpen: boolean) => void 
}) => {
  const isFeatured = (child: NavItem): child is FeaturedNavItem => {
    return 'type' in child && child.type === 'featured';
  };

  const isStandard = (child: NavItem): child is StandardNavItem => {
    return !('type' in child);
  };

  return (
  <div className={`lg:hidden ${isOpen ? 'fixed inset-0 bg-gray-800/50 z-50' : 'hidden'}`}>
    <div className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-lg font-merriweather font-bold text-[#003366]">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-[#0f5a5e] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4">
              {navItems.map((item: NavItem, index: number) => (
              <div key={index} className="mb-2">
                  {isFeatured(item) ? (
                    <div>
                      <a href={item.link} className="block px-4 py-2 font-merriweather text-[#003366] hover:bg-[#0f5a5e]/5 transition-colors">
                        {item.title}
                      </a>
                      <div className="ml-4 mt-1 border-l-2 border-[#0f5a5e]/20">
                        {item.items.map((menuItem, itemIdx) => (
                          <a
                            key={itemIdx}
                            href={menuItem.link}
                  className="block px-4 py-2 font-merriweather text-[#003366] hover:bg-[#0f5a5e]/5 transition-colors"
                >
                            {menuItem.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <a href={item.link} className="block px-4 py-2 font-merriweather text-[#003366] hover:bg-[#0f5a5e]/5 transition-colors">
                  {item.title}
                </a>
                {item.children && (
                  <div className="ml-4 mt-1 border-l-2 border-[#0f5a5e]/20">
                    {item.children.map((child, childIdx) => (
                      <div key={childIdx}>
                              <a href={child.link} className="block px-4 py-2 font-merriweather text-[#003366] hover:bg-[#0f5a5e]/5 transition-colors">
                          {child.title}
                        </a>
                        {child.children && (
                          <div className="ml-4 border-l-2 border-[#0f5a5e]/20">
                            {child.children.map((subChild, subIdx) => (
                              <a
                                key={subIdx}
                                      href={subChild.link}
                                className="block px-4 py-2 font-merriweather text-[#003366] hover:bg-[#0f5a5e]/5 transition-colors"
                              >
                                {subChild.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex flex-col space-y-2">
            <a href="/login" className="w-full px-4 py-2 text-center text-[14px] font-merriweather font-semibold text-[#003366] border border-[#0f5a5e]/20 hover:bg-[#0f5a5e]/5">
              SIGN IN
            </a>
            <a href="/membership" className="w-full px-4 py-2 text-center text-[14px] font-merriweather font-semibold text-white bg-gradient-to-r from-[#003366] via-[#004080] to-[#0f5a5e] hover:opacity-90">
              JOIN GSK
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

const UserNav = () => {
  const { data: session } = useSession();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/notifications" className="flex items-center cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action="/api/auth/signout" method="POST" className="w-full">
            <button type="submit" className="flex items-center w-full cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HelloBar = () => {
  const [sliderItems, setSliderItems] = useState<Array<{ 
    text: string; 
    link?: string | null;
    linkText?: string | null;
  }>>([]);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const response = await fetch("/api/slider");
        if (!response.ok) throw new Error("Failed to fetch slider items");
        const data = await response.json();
        setSliderItems(data);
      } catch (error) {
        console.error("Failed to fetch slider items:", error);
      }
    };

    fetchSliderItems();
  }, []);

  return (
    <div className="bg-[#003366] text-white">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#0f5a5e]/60 py-1.5 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#0f5a5e]/60 animate-pulse"></div>
          <div className="whitespace-nowrap animate-marquee">
            {sliderItems.map((item, index) => (
              <span key={index} className="font-merriweather text-xs text-white/90">
                {item.link ? (
                  <>
                    {item.text}
                    {item.linkText && (
                      <>
                        {" - "}
                        <a href={item.link} className="hover:text-white transition-colors">
                          {item.linkText}
                        </a>
                      </>
                    )}
                  </>
                ) : (
                  item.text
                )}
                {index < sliderItems.length - 1 && <span className="mx-12">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href="/donate" className="inline-flex items-center gap-2 px-4 py-1 bg-[#0f5a5e]/80 hover:bg-[#0f5a5e] text-sm font-merriweather text-white transition-all">
            Donate
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
          <a href="/volunteer" className="inline-flex items-center gap-2 px-4 py-1 bg-[#003366] hover:bg-[#0f5a5e]/60 text-sm font-merriweather text-white/90 hover:text-white transition-all">
            Volunteer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/guidelines" className="text-sm font-merriweather text-white/90 hover:text-[#0f5a5e]/80 transition-colors">Clinical Guidelines</a>
          <span className="text-white/50">|</span>
          <a href="/research" className="text-sm font-merriweather text-white/90 hover:text-[#0f5a5e]/80 transition-colors">Research Updates</a>
          <span className="text-white/50">|</span>
          <a href="/cpd" className="text-sm font-merriweather text-white/90 hover:text-[#0f5a5e]/80 transition-colors">CPD Points</a>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const navItems: NavItem[] = [
    {
      title: 'About Us',
      link: '/about',
      children: [
        { title: 'Mission & Vision', link: '/about' },
        { title: 'Leadership', link: '/about/leadership' }
      ]
    } as StandardNavItem,
    {
      title: 'Education',
      link: '/education',
      children: [
        {
          title: 'Resources',
          link: '/education/resources',
          children: [
            { title: 'Clinical Guidelines', link: '/guidelines' },
            { title: 'Training Programs', link: '/training' },
            { title: 'Research', link: '/research' }
          ]
        }
      ]
    } as StandardNavItem,
    {
      title: 'Events',
      link: '/events',
      children: [
        { title: 'Upcoming Conferences', link: '/conferences' },
        { title: 'Workshops', link: '/workshops' }
      ]
    } as StandardNavItem,
    { title: 'News', link: '/news' } as StandardNavItem,
    { title: 'Pricing', link: '/pricing' } as StandardNavItem,
    {
      title: 'Membership',
      link: '/membership',
      type: 'featured',
      image: '/meeting/75B_6035.jpg',
      description: 'Discussion among doctors - Membership: More than 16,000 professionals worldwide call GSK their professional home.',
      items: [
        { title: 'Join GSK', link: '/membership/join', description: 'Join our diverse mix of professionals.' },
        { title: 'Renew Membership', link: '/membership/renew', description: 'Continue to receive exclusive benefits and discounts.' },
        { title: 'Benefits', link: '/membership/benefits', description: 'Unrivaled by any other GI organization.' },
        { title: 'Membership Directory', link: '/membership/directory', description: 'Contact other GSK members.' },
        { title: 'Recognition Awards', link: '/membership/awards', description: 'We honor our esteemed members.' },
        { title: 'Initiatives & Programs', link: '/membership/initiatives', description: 'Advancing the science and practice of GI.' },
        { title: 'Get Involved with GSK', link: '/membership/get-involved', description: 'Help us achieve a world free from digestive diseases.' },
        { title: 'Advocacy & GSK PAC', link: '/membership/advocacy', description: 'Advancing public policies that support gastroenterology.' }
      ]
    } as FeaturedNavItem
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <HelloBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col">
          {/* Top bar with logo */}
          <div className="flex justify-between items-center h-16 sm:h-20 border-b border-gray-100">
            <Logo />
            <div className="flex items-center space-x-6">
              {session ? (
                <UserNav />
              ) : (
                <div className="hidden lg:flex items-center space-x-6">
                  <a 
                    href="/login" 
                    className="text-sm font-semibold text-[#003366]/80 hover:text-[#0f5a5e]/70 transition-colors duration-200 uppercase"
                  >
                    Sign In
                  </a>
                  <a 
                    href="/register" 
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#003366] hover:bg-gradient-to-r hover:from-[#003366] hover:to-[#0f5a5e]/80 transition-all duration-200 uppercase tracking-wider"
                  >
                    Join GSK
                  </a>
                </div>
              )}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#003366]/80 hover:text-[#0f5a5e]/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Navigation bar - desktop */}
          <nav className="hidden lg:flex justify-between items-center">
            <ul className="flex -mx-2 items-center">
              {navItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
            <div className="flex items-center h-12">
              <button className="p-2 text-[#003366]/70 hover:text-[#0f5a5e] transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        navItems={navItems} 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen}
      />
    </header>
  );
};

export default Navigation; 