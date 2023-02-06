import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
const Registrar = () => {
  const [personas, setPersonas] = useState([]);
  return (
    <div className="grid justify-items-center gap-y-10">
      <div className="w-11/12 rounded-md bg-white px-4 py-2">
        <h2>Empecemos registrandote Primero</h2>
      </div>

      <div className="flex w-11/12 cursor-pointer items-center justify-center rounded-md bg-white p-4 shadow-sm hover:shadow-md hover:bg-white/90">
        <h2 className="font-bold mr-3">
          Presiona aqui para anadir otra persona a tu grupo
        </h2>
        <PlusCircleIcon className="w-10" />
      </div>
    </div>
  );
};

export default Registrar;
