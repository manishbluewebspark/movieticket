"use client";
import dynamic from "next/dynamic";
import React from "react";
// import Cinemabooking from "../Components/Cinemabooking/CinemaBookig";
const Cinemabooking = dynamic(
  () => import("../Components/Cinemabooking/CinemaBookig"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);
const page = () => {
  return (
    <>
      <Cinemabooking />
    </>
  );
};

export default page;
