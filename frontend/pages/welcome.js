import Head from 'next/head';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import axios from 'axios';

export default function Home(initialData) {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <h1>Auth Test</h1>

      <div>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>

      <h1>Content...</h1>

      <div>
        {initialData.journals &&
          initialData.journals.map((each, index) => {
            return (
              <div key={index}>
                <h3>{each.Title}</h3>
                <p>{each.Journal}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  let headers = {};
  const session = await getSession({ req });
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }
  let journals = [];
  try {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/journals`,
      {
        headers: headers,
      },
    );
    journals = data;
  } catch (e) {
    console.log('caught error');
    journals = [];
  }

  return { props: { journals: journals } };
}
