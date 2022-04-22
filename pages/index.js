import Head from "next/head";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sistema de Tamizaje</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </div>
  );
}
