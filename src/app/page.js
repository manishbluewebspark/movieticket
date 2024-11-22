import Image from "next/image";
import Navbar from "./Components/Header/Navbar";
import QuickFilters from "./Components/Header/QuickFilters";
import MoviesList from "./Components/Lists/MoviesList";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <QuickFilters></QuickFilters>
      <MoviesList></MoviesList>
    </div>
  );
}
