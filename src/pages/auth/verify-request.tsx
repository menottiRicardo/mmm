import React from "react";

const VerifyRequest = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full select-none items-center justify-center bg-black bg-opacity-90 px-4">
      <div className="absolute left-1/2 top-1/2 grid w-11/12 -translate-x-1/2 -translate-y-1/2 select-none rounded-md bg-white px-2 py-3 shadow-xl">
        <h2 className="text-primary-600 text-center text-base font-bold text-gray-500">
          Dios te bendiga!
        </h2>
        <h1 className="text-primary-600 text-center text-xl font-bold">
          {/* code : {title} */}
          Verifica tu correo
        </h1>
        <p className="mt-2 rounded-md px-5 py-2 font-medium text-center">
          Te hemos enviado un correo con el link para que inicies sesion!
        </p>
      </div>
    </div>
  );
};

export default VerifyRequest;
