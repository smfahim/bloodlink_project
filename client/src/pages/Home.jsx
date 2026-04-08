import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Search from "../components/Search";
import DonorList from "../components/DonorList";
import UrgentRequests from "../components/UrgentRequests";  // ← ADD THIS

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Search />
      <DonorList />
      <UrgentRequests />  
    </>
  );
};

export default Home;