import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSidebar = ({transactions, banks, user }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-blue-500 font-bold text-5xl">{user?.firstName?.[0] ?? "?"}</span>
          </div>
          <div className="profile-details">
            <div className="profile-name">
            <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div className="profile-email">{user.email}</div>
          </div>
        </div>
      </section>
      <section className="banks">
        <div className="flex w-full justify-between">
            <h2 className="header-2">My Banks</h2>
            <Link href='/' className="flex gap-1">
            <Image src="icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
            </Link>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
