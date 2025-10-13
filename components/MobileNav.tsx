"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Footer from "./Footer";
import { MobileNavProps } from "@/types";
import PlaidLink from "./PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-ful max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="flex items-center cursor-pointer gap-1 px-4"
              >
                <Image
                  src="/icons/logo.svg"
                  width={34}
                  height={34}
                  alt="KFinance logo"
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                  K-Finance
                </h1>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col px-4 pt-10 gap-5 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith("${item.route}/");
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bankGradient": isActive,
                        })}
                        href={item.route}
                        key={item.label}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />

                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                <PlaidLink user={user} />
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
