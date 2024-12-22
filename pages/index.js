import dynamic from "next/dynamic";
import Link from "next/link";

const Layout = dynamic(() => import("../components/layout/index"), { ssr: false });

export default function Home() {
  return (
    <>
      <Layout metaTitle="Home" metaDescription="ini adalah halaman home">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Selamat Datang di Beranda!</h1>
          <p className="text-lg text-gray-600 mb-4">Klik tombol di bawah untuk mengelola catatan Anda.</p>
          <Link className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 focus:outline-none" href="/notes">
            Kelola Notes
          </Link>
        </div>
      </Layout>
    </>
  );
}
