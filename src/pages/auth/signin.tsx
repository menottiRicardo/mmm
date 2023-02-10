import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { getCsrfToken } from "next-auth/react";
import Image from "next/image";

const Signin = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Night"
            src="/panama_city.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            width={1000}
            height={1000}
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <div className="relative h-20 w-20">
              <Image alt="Night" src="/logo.png" className="opacity-70" fill />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Dios le bendiga!
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Bienvenido al Congreso Mundial 2023 en Panama
            </p>
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-5 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6 "
        >
          <div className="w-full sm:w-10/12 2xl:w-3/4">
            <div className="relative -mt-16 block lg:hidden">
              <div className="relative h-20 w-20">
                <Image
                  alt="Night"
                  src="/logo.png"
                  className="opacity-90"
                  fill
                />
              </div>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Dios le bendiga!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Bienvenido al Congreso Mundial 2023 en Panama
              </p>
            </div>

            <form
              className="mt-8 grid gap-6"
              method="post"
              action="/api/auth/signin/email"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electronico
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Iniciar sesi{"ó"}n
                </button>
              </div>
            </form>
          </div>
        </main>
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

  const csrfToken = await getCsrfToken(context);

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

  return {
    props: { csrfToken },
  };
}
