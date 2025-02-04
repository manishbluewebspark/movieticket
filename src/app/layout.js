"use client";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./Components/Header/Navbar";
import ReleaseTypeComponent from "./Components/Footer/ReleaseTypeComponent";
import Footer from "./Components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-icons@1.10.5/font/bootstrap-icons.css"/>

      </head>
      <Suspense fallback={<div>Loading...</div>}>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Provider store={store}>
            <Navbar />
            <div className="home-page-con">{children}</div>
            <ReleaseTypeComponent />
            <Footer />
          </Provider>
        </body>
      </Suspense>
    </html>
  );
}
