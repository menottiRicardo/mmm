import { UserCircleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [dropDown, setDropDown] = useState(false);

  const router = useRouter();
  const logOut = async () => {
    await signOut();
    router.reload();
  };
  return (
    <main className="min-h-screen bg-gray-100">
      {/* navbar */}
      <div className="mb-4 flex h-20 items-center justify-between bg-white px-4 shadow-lg">
        {/* logo */}
        <div className="relative h-16 w-24">
          <Image src={"/logo.png"} alt="movimiento misionero logo" fill />
        </div>

        {/* profile */}
        <div onClick={void logOut} className="relative">
          <UserCircleIcon className="w-12" />
        </div>
      </div>

      <div className="px-4">{children}</div>
    </main>
  );
};

export default UserLayout;
