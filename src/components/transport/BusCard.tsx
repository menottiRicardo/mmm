import React from "react";

const BusCard = ({ id, plate, route }: { id: string; plate: string, route: string }) => {
  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div className="rounded-[10px] bg-white p-4 sm:p-6">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          Ricardo Menotti
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">Bus #{route}</h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            En transito
          </span>

          {/* <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            JavaScript
          </span> */}
        </div>
      </div>
    </article>
  );
};

export default BusCard;
