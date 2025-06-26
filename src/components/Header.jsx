"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "about", label: "About", isSection: true },
    { href: "journey", label: "Journey", isSection: true },
    { href: "gallery", label: "Gallery", isSection: true },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = async (e, link) => {
    if (link.isSection) {
      e.preventDefault();
      setIsOpen(false);

      if (pathname !== "/") {
        router.prefetch("/");
        sessionStorage.setItem("sectionToScroll", link.href);
        router.push("/", { scroll: false });
      } else {
        requestAnimationFrame(() => scrollToSection(link.href));
      }
    } else {
      router.prefetch(link.href);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      const sectionId = sessionStorage.getItem("sectionToScroll");
      if (sectionId) {
        requestAnimationFrame(() => {
          scrollToSection(sectionId);
          sessionStorage.removeItem("sectionToScroll");
        });
      }
    }
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Swipe to close
  useEffect(() => {
    let startX = 0;
    let currentX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      currentX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diffX = currentX - startX;
      if (diffX > 50) {
        setIsOpen(false);
      }
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener("touchstart", handleTouchStart);
      menu.addEventListener("touchmove", handleTouchMove);
      menu.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("touchstart", handleTouchStart);
        menu.removeEventListener("touchmove", handleTouchMove);
        menu.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <header className="flex fixed top-0 left-0 items-center justify-between px-4 md:px-10 z-50 w-full h-20 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="flex items-center justify-center z-10">
        <Link href="/" prefetch>
          <Image
            src="/logo/Cream Red Simple Bold Modern Creative Studio Logo 1.png"
            alt="Shafi parambil Logo"
            width={150}
            height={50}
            className="md:h-16 h-8 w-auto"
            priority
            loading="eager"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:text-sm text-xs space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.isSection ? `/#${link.href}` : link.href}
            onClick={(e) => handleNavigation(e, link)}
            className="relative text-white hover:text-[var(--primary-color)] font-medium group"
            prefetch
          >
            {link.label}
            <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>

      {/* Desktop Social Media */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="https://facebook.com"
          target="_blank"
          className="text-white hover:text-[var(--primary-color)]"
        >
          <FaFacebook className="h-5 w-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          className="text-white hover:text-[var(--primary-color)]"
        >
          <BsTwitterX className="h-5 w-5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          className="text-white hover:text-[var(--primary-color)]"
        >
          <FaInstagram className="h-5 w-5" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          className="text-white hover:text-[var(--primary-color)]"
        >
          <FaYoutube className="h-5 w-5" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        className="md:hidden z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <BiMenu className="w-8 h-8 text-[var(--primary-color)]" />
      </button>

      {/* Darker Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-screen w-64 bg-black z-50 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } shadow-2xl flex flex-col justify-between`}
      >
        {/* Logo at Top Right Corner */}
        <div className=" justify-end px-4 py-4">
          <Image
            src="/logo/Cream Red Simple Bold Modern Creative Studio Logo 1.png"
            alt="Shafi parambil Logo"
            width={120}
            height={40}
            className="w-auto h-10"
            priority
          />

          {/* Navigation */}
          <nav className="flex flex-col  space-y-4 px-3 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.isSection ? `/#${link.href}` : link.href}
                onClick={(e) => handleNavigation(e, link)}
                className="text-white hover:text-[var(--primary-color)] text-lg font-medium py-2 border-b border-gray-800 transition"
                prefetch
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Social Media Bottom Centered */}
        <div className="px-6 py-6">
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-white hover:text-[var(--primary-color)]"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-white hover:text-[var(--primary-color)]"
            >
              <BsTwitterX className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-white hover:text-[var(--primary-color)]"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="text-white hover:text-[var(--primary-color)]"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
