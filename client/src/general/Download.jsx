import { Play, Star, Apple, QrCode } from "lucide-react"; // Removed Android, using Play for Google Play

export default function Download() {
  return (
    <section className="min-h-[70vh] bg-white flex items-center justify-center font-inter w-full">
      <div className="w-full bg-white shadow-2xl rounded-3xl md:p-12 flex flex-col lg:flex-row gap-12">

        {/* Left Section: App Info, Download Buttons, Stats, Testimonials */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-4 md:p-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Transform Your Barber Shop Today!
          </h1>
          <p className="text-lg text-gray-700 mb-10 max-w-xl">
            Streamline bookings, manage appointments, and grow your business with Numbr – the ultimate app for barbershops.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-transform transform hover:-translate-y-1"
            >
              <Apple className="h-6 w-6 mr-3" />
              Download on the App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-transform transform hover:-translate-y-1"
            >
              <Play className="h-6 w-6 mr-3" />
              Get it on Google Play
            </a>
          </div>
        </div>

        {/* Right Section: QR Code */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center p-8 bg-gray-900 rounded-3xl shadow-xl text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Scan to Download</h2>
          <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://placehold.co/250x250/000000/FFFFFF?text=QR+Code" // Black QR on White background
              alt="QR Code to download app"
              className="w-64 h-64 rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}