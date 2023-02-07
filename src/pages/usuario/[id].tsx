import { useRouter } from "next/router";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import UserLayout from "../../components/layouts/UserLayout";
import { QrScanner } from "@yudiel/react-qr-scanner";

const User = () => {
  const [selectedTab, setSelectedTab] = useState<undefined | TAB>(undefined);
  const [data, setData] = useState("No result");
  const router = useRouter();

  const { id } = router.query;

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
          <QRCode value={id as string} />
        </div>
      )}
      {selectedTab === TAB.READ_QR && (
        <QrScanner
          onDecode={(result) => console.log(result)}
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
}
