import { Session } from "inspector";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";

const Signin = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Dios le bendiga!</h1>

          <p className="mt-4 text-gray-500">
            Inicia Sesion en una de tus cuentas!
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        {/* <Image src={logo} layout="fill" alt="logo image" /> */}
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button onClick={() => void signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    let destination = "/";
    switch (session.user.role) {
      case "USER":
        destination = `/usuario/${session.user.id}`;
        break;

      default:
        break;
    }
    return { redirect: { destination } };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
}
