import React from "react";

const getGradientColor = (status: string) => {
  let gradient = "";
  switch (status) {
    case "EN TRANSITO":
      gradient = "from-yellow-400 via-yellow-900 to-yellow-200";
      break;

    case "AEROPUERTO":
      gradient = "from-green-400 via-green-900 to-green-200";
      break;

    default:
      break;
  }

  return gradient;
};

const BusCard = ({
  id,
  plate,
  route,
  status,
}: {
  id: string;
  plate: string;
  route: string;
  status: string;
}) => {
  return (
    <article
      className={`animate-background rounded-xl bg-gradient-to-r ${getGradientColor(
        status
      )} bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm`}
    >
      <div className="rounded-[10px] bg-white p-4 sm:p-6">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          Ricardo Menotti
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            Bus #{route}
          </h3>
        </a>

        <p className="text-gray-400">{plate}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {status}
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
