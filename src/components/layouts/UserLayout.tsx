import { UserCircleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserLayout = ({ children }: { children: any }) => {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* navbar */}
      <div className="mb-4 flex h-20 items-center justify-between bg-white px-4 shadow-lg">
        {/* logo */}
        <div className="relative h-16 w-24">
          <Image src={"/logo.png"} alt="movimiento misionero logo" fill />
        </div>

        {/* profile */}
        <UserCircleIcon className="w-12" onClick={() => void signOut()} />
      </div>
      <div className="px-4">{children}</div>
    </main>
  );
};

export default UserLayout;
