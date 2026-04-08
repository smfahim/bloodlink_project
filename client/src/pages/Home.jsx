import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Search from "../components/Search";
import DonorList from "../components/DonorList";
import UrgentRequests from "../components/UrgentRequests";
import Footer from "../components/Footer";       // ← ADD THIS

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Search />
      <DonorList />
      <UrgentRequests />
      <Footer />                                  
    </>
  );
};

export default Home;