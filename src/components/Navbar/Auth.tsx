import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { api } from "../../utils/api";
const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex w-1/3 items-center justify-end">
      <p className=" mr-4">
        {sessionData && <span> Loggeado como {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-gray-300 px-10 py-3 font-semibold no-underline transition hover:bg-gray-600/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Auth;
