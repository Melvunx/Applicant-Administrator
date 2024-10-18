import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./layout/Card";

const Offer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {data.map((offer, index) => (
          <Card key={index} offer={offer} />
        ))}
      </ul>
    </div>
  );
};

export default Offer;
