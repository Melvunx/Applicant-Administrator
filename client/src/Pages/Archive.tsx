import Navbar from "@/components/Navbar";
import CardArchived from "@layout/CardArchived";
import axios from "axios";
import { useEffect, useState } from "react";
import { Offers } from "./Home";

const Archive = () => {
  const [archivedData, setArchivedData] = useState([]);

  const fetchArchivedOffers = async () => {
    await axios.get(import.meta.env.VITE_OFFER_URL).then((res) => {
      const archivedOffers = res.data.map((offer: Offers) => ({
        ...offer,
        applyDate: new Date(offer.applyDate),
      }));
      setArchivedData(
        archivedOffers.filter((offer: Offers) => offer.archived === true)
      );
    });
  };

  const handleDelete = (id: string) => {
    setArchivedData((prevData) =>
      prevData.filter((offer: Offers) => offer._id !== id)
    );
  };

  useEffect(() => {
    fetchArchivedOffers();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-center font-bold text-lime-600 ">Page Archive</h1>
      <ul className="flex flex-col items-center justify-center gap-5 py-4">
        {archivedData.length === 0 ? (
          <p>Aucune offre archivée trouvée</p>
        ) : (
          archivedData.map((offer: Offers) => (
            <CardArchived
              key={offer._id}
              offer={offer}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default Archive;
