import Card from "@/components/layout/Card";
import Form from "@/components/layout/Form";
import Navbar from "@/components/Navbar";
import WordFadeIn from "@/components/ui/word-fade-in";
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
  archived: boolean;
}

const Home = () => {
  const [data, setData] = useState<Offers[]>([]);

  const fetchOffers = async () => {
    axios.get(import.meta.env.VITE_OFFER_URL).then((res) => {
      const offers = res.data.map((offer: Offers) => ({
        ...offer,
        applyDate: new Date(offer.applyDate), // Conversion en objet Date
      }));
      setData(offers.filter((offer: Offers) => offer.archived === false));
    });
  };

  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_OFFER_URL}/${id}/archive`,
        { archived: isArchived }
      );
      console.log(res.data.message);

      // Rafraîchir les données d'archive après la mise à jour
      fetchOffers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'archivage", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div>
      <Navbar />
      <WordFadeIn
        words="Les offres où j'ai postulé !"
        delay={0.075}
        className="font-title tracking-wide text-cyan-800"
      />
      <ul className="flex flex-col items-center justify-center gap-5 py-4">
        {data.length === 0 ? (
          <p>Aucune offre trouvée</p>
        ) : (
          data.map((offer, index) => (
            <Card
              key={index}
              offer={offer}
              onArchiveToggle={handleArchiveToggle}
            />
          ))
        )}
      </ul>
      <Form refreshOffers={fetchOffers} />
    </div>
  );
};

export default Home;
