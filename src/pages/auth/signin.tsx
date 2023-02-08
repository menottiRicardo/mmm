import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { getCsrfToken } from "next-auth/react";

const Signin = ({
  csrfToken,
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

      <div className="grid w-full justify-items-center px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        {/* <Image src={logo} layout="fill" alt="logo image" /> */}
        {/* {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button
                onClick={() =>
                  void signIn(provider.id, {
                    email: "ricardin.menotti@gmail.com",
                    
                  })
                }
                className="my-3 rounded-md bg-orange-500 px-4 py-2 text-white"
              >
                Inicia sesion con {provider.name}
              </button>
            </div>
          ))} */}
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Email address
            <input type="email" id="email" name="email" />
          </label>
          <button type="submit">Sign in with Email</button>
        </form>
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
