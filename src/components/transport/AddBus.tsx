import React, { useState } from "react";
import { api } from "../../utils/api";
import Button from "../buttons/Button";
import ButtonWithIcon from "../buttons/ButtonWithIcon";
import SelectDrop, { ItemsType } from "../SelectDrop";
import SlideOver from "../SlideOver";

const AddBus = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const [driver, setDriver] = useState<ItemsType>({ id: "1", value: "1" });
  const [plate, setPlate] = useState("");
  const { data: drivers } = api.user.getUsersByRole.useQuery({
    role: "DRIVER",
  });

  const addBusMutation = api.bus.createBus.useMutation({
    onSuccess(result) {
      console.log(result);
    },
  });
  const addBus = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await addBusMutation.mutateAsync({ plate, driverId: driver.id as string });
  };

  console.log(drivers, driver, plate);

  if(drivers === undefined){
    return <></>
  }
  return (
    <>
      <ButtonWithIcon
        primary
        onClick={() => setOpenSlider(true)}
        text="Anadir Bus"
      />
      <SlideOver
        open={openSlider}
        setOpen={setOpenSlider}
        title={"Anadir Nuevo Bus"}
      >
        <form className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              Numero de Placa
            </label>

            <input
              type="text"
              id="placa"
              name="placa"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">
              Conductor
            </label>
            <SelectDrop items={drivers} setValue={setDriver} />
          </div>
          <div className="col-span-6">
            <Button
              text="Anadir"
              onClick={(e: React.SyntheticEvent) => void addBus(e)}
              primary
            />
          </div>
        </form>
      </SlideOver>
    </>
  );
};

export default AddBus;
