import Image from "next/image";
import Navbar from "./Components/Header/Navbar";
import Navbarold from "./Components/Header/Navbarold";
import QuickFilters from "./Components/Header/QuickFilters";
import MoviesList from "./Components/Lists/MoviesList";
import Footer from "./Components/Footer/Footer";
import ReleaseTypeComponent from "./Components/Footer/ReleaseTypeComponent";

export default function Home() {
  return (
   
      <MoviesList></MoviesList>
  );
}
