import ButtonOffers from "@/components/layout/ButtonOffers";
import Card from "@/components/layout/Card";
import FindNothingText from "@/components/layout/FindNothingText";
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

  const archiveAllOffers = async () => {
    if (window.confirm("Vous voulez vraiment archiver toutes les offres ?")) {
      try {
        await Promise.all(
          data.map((offer) =>
            axios.put(
              `${import.meta.env.VITE_OFFER_URL}/${offer._id}/archive`,
              { archived: true }
            )
          )
        );
        fetchOffers();
      } catch (error) {
        console.error(
          "Erreur lors de l'archivage de toutes les offres : ",
          error
        );
      }
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
        className="font-title tracking-wide text-indigo-600"
      />
      <ul className="flex flex-col items-center justify-center gap-5 overflow-hidden py-4">
        {data.length === 0 ? (
          <FindNothingText />
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
      {data.length > 1 && (
        <div className="flex justify-center p-3">
          <ButtonOffers onClick={archiveAllOffers}>
            <h1 className="rounded-md border px-4 py-2 font-title text-lg shadow-md transition-transform hover:scale-105 hover:animate-pulse hover:bg-lime-200 hover:font-bold">
              Archiver toutes les offres
            </h1>
          </ButtonOffers>
        </div>
      )}
      <Form refreshOffers={fetchOffers} />
    </div>
  );
};

export default Home;
