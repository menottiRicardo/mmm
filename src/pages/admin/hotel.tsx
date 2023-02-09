
import React, { useState } from "react";
import ButtonWithIcon from "../../components/buttons/ButtonWithIcon";
import AdminLayout from "../../components/layouts/AdminLayout";

const Hotel = () => {
  const [openSlider, setOpenSlider] = useState(false);
  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hotele</h1>

        <ButtonWithIcon
          primary
          onClick={() => console.log("click")}
          text="Anadir Bus"
        />
      </div>
    </AdminLayout>
  );
};

export default Hotel;
