import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import AddBus from "../../components/transport/AddBus";
import BusCard from "../../components/transport/BusCard";
import { api } from "../../utils/api";

const Transport = () => {
  const { data: buses } = api.bus.getAllBuses.useQuery();
  console.log('bus', buses)
  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transporte</h1>

        <AddBus />
      </div>

      {/* buses container */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {buses &&
          buses.map((bus) => (
            <BusCard
              key={bus.id}
              route={bus.route as any}
              id={bus.id}
              plate={bus.plate}
              status={bus.status}
            />
          ))}
      </div>
    </AdminLayout>
  );
};

export default Transport;
