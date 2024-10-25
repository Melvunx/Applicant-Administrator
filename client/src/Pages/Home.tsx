import Footer from "@/components/Footer";
import ButtonOffers from "@/components/layout/ButtonOffers";
import Card from "@/components/layout/Card";
import Filter from "@/components/layout/Filter";
import FindNothingText from "@/components/layout/FindNothingText";
import Form from "@/components/layout/Form";
import OfferCounter from "@/components/layout/OfferCounter";
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
  const [filteredData, setFilteredData] = useState<Offers[]>([]); // Ajout pour gérer les données filtrées

  // Fetch des offres depuis l'API
  const fetchOffers = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_OFFER_URL);
      const offers = res.data.map((offer: Offers) => ({
        ...offer,
        applyDate: new Date(offer.applyDate), // Conversion en objet Date
      }));
      const activeOffers = offers.filter(
        (offer: Offers) => offer.archived === false
      );
      setData(activeOffers);
      setFilteredData(activeOffers); // Initialiser filteredData avec toutes les offres
    } catch (error) {
      console.error("Erreur lors de la récupération des offres", error);
    }
  };

  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_OFFER_URL}/${id}/archive`,
        { archived: isArchived }
      );
      console.log(res.data.message);
      fetchOffers(); // Rafraîchir les offres après l'archivage
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
        fetchOffers(); // Rafraîchir les offres après l'archivage
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

  // Fonction de mise à jour des offres filtrées
  const handleFilter = (filteredOffers: Offers[]) => {
    setFilteredData(filteredOffers);
  };

  return (
    <div>
      <Navbar />
      <WordFadeIn
        words="Les offres où j'ai postulées !"
        delay={0.075}
        className="mx-auto w-10/12 py-6 font-title tracking-wide text-indigo-600  sm:w-9/12 sm:text-xl md:text-2xl lg:text-5xl"
      />
      {/* Passer la fonction de filtrage et les données d'offres */}
      <Filter offers={data} onFilter={handleFilter} />
      {filteredData.length > 0 && (
        <OfferCounter
          offerList={filteredData}
          className="font-bold italic text-indigo-400"
        />
      )}

      <ul className="flex flex-col items-center justify-center gap-5 overflow-hidden py-4">
        {filteredData.length === 0 ? (
          <FindNothingText offerPage="récurrente" />
        ) : (
          filteredData.map((offer, index) => (
            <Card
              key={index}
              offer={offer}
              onArchiveToggle={handleArchiveToggle}
            />
          ))
        )}
      </ul>

      {filteredData.length > 1 && (
        <div className="flex justify-center p-3">
          <ButtonOffers
            className="rounded-md border px-4 py-2 font-title text-lg shadow-md transition-transform hover:scale-105 hover:animate-pulse hover:bg-lime-200 hover:font-bold"
            onClick={archiveAllOffers}
          >
            Archiver toutes les offres
          </ButtonOffers>
        </div>
      )}

      <Form refreshOffers={fetchOffers} />
      <Footer />
    </div>
  );
};

export default Home;
