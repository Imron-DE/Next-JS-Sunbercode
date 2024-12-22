import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Head from "next/head";

export default function Layout({ children, metaTitle = "Create Next App", metaDescription = "Generated by create next app" }) {
  return (
    <>
      <Head>
        <title>{metaTitle || "Default Title"} </title>
        <meta name="description" content={metaDescription || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}
