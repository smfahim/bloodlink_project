import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Search from "../components/Search";
import DonorList from "../components/DonorList";  // ← ADD THIS

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Search />
      <DonorList />   {/* ← ADD THIS */}
    </>
  );
};

export default Home;