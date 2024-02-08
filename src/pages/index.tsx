import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-24">
        <h1 className="text-3xl font-bold">
          Welcome to Your Notification Center
        </h1>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Your existing content */}
        </div>
        {/* Consider adjusting or incorporating the rest of the content as needed */}
      </main>
    </div>
  );
};

export default Home;
