import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Auth from "./Auth";
const Navbar = () => {
  const { data: sessionData } = useSession();
  const getNavs = () => {
    switch (sessionData?.user.role) {
      case "ADMIN":
        return (
          <>
            <Link href={"#"}>
              <p className="nav-link">Dashboard</p>
            </Link>
            <Link href={"#"}>
              <p className="nav-link">Registros</p>
            </Link>
            <Link href={"#"}>
              <p className="nav-link">hola</p>
            </Link>
            <Link href={"#"}>
              <p className="nav-link">hola</p>
            </Link>
          </>
        );

      default:
        return (
          <>
            <Link href={"/registrar"}>
              <p className="nav-link">Registrar</p>
            </Link>
            <Link href={"/pases"}>
              <p className="nav-link">Pases</p>
            </Link>
          </>
        );
    }
  };
  return (
    <div className="mx-2 flex items-center justify-center rounded-b-xl bg-white py-2 px-2">
      <div className="w-1/3">
        <Link href={"/"}>
          <p>LOGO</p>
        </Link>
      </div>
      <div className="flex w-1/3 items-center justify-around">
        {sessionData && getNavs()}
      </div>
      <Auth />
    </div>
  );
};

export default Navbar;
