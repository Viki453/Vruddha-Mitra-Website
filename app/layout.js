import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { ReservationProvider } from "./_components/ReservationContext";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Vruddha Mitra",
    default: "Vruddha Mitra",
  },
  description: "A Companion for the elderly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="retro">
      <body className="flex flex-col min-h-screen bg-base-100">
        <Navbar />
        <main className="flex-grow w-full px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mt-20">
          {/* Add padding for mobile & tablet, limit max width */}
          <ReservationProvider>{children}</ReservationProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
