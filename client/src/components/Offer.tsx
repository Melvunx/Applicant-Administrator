import Card from "@layout/Card";
import Form from "@layout/Form";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Offers {
  _id: string;
  title: string;
  type: string;
  company: string;
  url: string;
  applyDate: Date;
  status: string;
}

const Offer = () => {
  const [data, setData] = useState([]);

  const fetchOffers = async () => {
    axios.get(import.meta.env.VITE_OFFER_URL).then((res) => {
      const offers = res.data.map((offer: Offers) => ({
        ...offer,
        applyDate: new Date(offer.applyDate), // Conversion en objet Date
      }));
      setData(offers);
    });
  };

  const handleArchive = (id: string) => {
    setData((prevData) => prevData.filter((offer: Offers) => offer._id !== id));
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((offer: Offers) => offer._id !== id));
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div>
      <ul className="flex flex-col items-center justify-center gap-5 py-4">
        {data.length === 0 ? (
          <p>Aucune offre trouvée</p>
        ) : (
          data.map((offer, index) => (
            <Card
              key={index}
              offer={offer}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>
      <Form refreshOffers={fetchOffers} />
    </div>
  );
};

export default Offer;
