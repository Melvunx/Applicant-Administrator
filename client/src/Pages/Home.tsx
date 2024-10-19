import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center font-bold">Mes offres où j'ai postulé !</h1>
      <Offer />
    </div>
  );
};

export default Home;
