import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./layout/Card";

const Offer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_OFFER_URL)
      .then((res) => setData(res.data || []));
  }, []);

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {data.length === 0 ? (
          <p>Aucune offre trouvée</p>
        ) : (
          data.map((offer, index) => <Card key={index} offer={offer} />)
        )}
      </ul>
    </div>
  );
};

export default Offer;
