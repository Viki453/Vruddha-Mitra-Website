// app/layout.js
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { ReservationProvider } from "./_components/ReservationContext";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Vruddha Mitra",
    default: "Vruddha Mitra",
  },
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="retro">
      <body className="flex flex-col min-h-screen bg-base-100">
        <Navbar />
        <main className="flex-grow w-full max-w-10xl mx-auto mt-20  bg-base-100 m-10 ">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
