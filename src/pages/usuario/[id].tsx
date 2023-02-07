import { useRouter } from "next/router";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import UserLayout from "../../components/layouts/UserLayout";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { api } from "../../utils/api";

const User = () => {
  const [selectedTab, setSelectedTab] = useState<undefined | TAB>(undefined);
  const [message, setMessage] = useState({ message: "", status: "" });
  const router = useRouter();

  const { id } = router.query;

  const data = api.user.getUserInfo.useQuery({ id: id as string });

  const handleQRScan = (message: string) => {
    setMessage({ message, status: "success" });
    setSelectedTab(TAB.SHOW_MESSAGE);
  };

  const generateQRString = () => {
    const QRString = JSON.stringify({ userId: id });
    return QRString;
  };

  if (data?.data?.active === false) {
    return (
      <UserLayout>
        {/* tabs */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="rounded-lg bg-white p-4 shadow-sm transition-colors duration-150 ease-in">
            <h1 className="text-center text-2xl font-bold">
              Parece que tu cuenta no ha sido activada
            </h1>

            {/* id input */}
            <div className="mt-4">
              <label htmlFor="askActive">
                Escribe tu numero de{" "}
                <span className="font-bold">Pasaporte</span>
              </label>
              <div className="rounded-md border-2 border-orange-500 p-2">
                <input
                  id="askActive"
                  className="ml-2 outline-none"
                  placeholder="Pasaporte"
                />
              </div>
              <div className="mt-4 mb-4 flex items-center justify-center">
                <button className="mt-2 cursor-auto rounded-full bg-orange-400 px-4 py-2 transition-transform ease-in active:scale-105">
                  Solicitar Activacion
                </button>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      {/* tabs */}
      <div className="grid gap-y-4 pb-5">
        <div
          className={`flex h-20 items-center justify-center rounded-lg transition-colors duration-150 ease-in ${
            selectedTab === TAB.SHOW_QR
              ? "bg-orange-400 text-white shadow-xl"
              : "bg-white shadow-sm"
          }`}
          onClick={() => setSelectedTab(TAB.SHOW_QR)}
        >
          <span className="text-2xl font-bold">Mi codigo QR</span>
        </div>

        <div
          className={`flex h-20 items-center justify-center rounded-lg transition-colors duration-150 ease-in ${
            selectedTab === TAB.READ_QR
              ? "bg-orange-400 text-white shadow-xl"
              : "bg-white shadow-sm"
          }`}
          onClick={() => setSelectedTab(TAB.READ_QR)}
        >
          <span className="text-2xl font-bold">Escanear codigo QR</span>
        </div>
      </div>

      {selectedTab === TAB.SHOW_QR && (
        <div className="flex items-center justify-center rounded-md bg-white p-4 shadow-md">
          <QRCode value={generateQRString()} />
        </div>
      )}
      {selectedTab === TAB.SHOW_MESSAGE && (
        <div className="flex items-center justify-center rounded-md bg-white p-4 shadow-md">
          <span>{message.message}</span>
        </div>
      )}
      {selectedTab === TAB.READ_QR && (
        <QrScanner
          onDecode={(result) => handleQRScan(result)}
          onError={(error) => console.log(error?.message)}
        />
      )}
    </UserLayout>
  );
};

export default User;

enum TAB {
  READ_QR = "qr",
  SHOW_QR = "show",
  SHOW_MESSAGE = "message",
}
