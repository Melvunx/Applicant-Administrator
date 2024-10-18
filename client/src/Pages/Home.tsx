import Form from "@/components/layout/Form";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-center font-bold">Page home</h1>
      <Offer />
      <Form />
    </div>
  );
};

export default Home;
