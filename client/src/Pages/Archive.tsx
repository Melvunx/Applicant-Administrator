import ButtonOffers from "@/components/layout/ButtonOffers";
import FindNothingText from "@/components/layout/FindNothingText";
import Navbar from "@/components/Navbar";
import WordFadeIn from "@/components/ui/word-fade-in";
import CardArchived from "@layout/CardArchived";
import axios from "axios";
import { useEffect, useState } from "react";
import { Offers } from "./Home";

const Archive = () => {
  const [archivedData, setArchivedData] = useState<Offers[]>([]);

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

  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_OFFER_URL}/${id}/archive`,
        { archived: isArchived }
      );
      console.log(res.data.message);

      // Rafraîchir les données d'archive après la mise à jour
      fetchArchivedOffers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'archivage", error);
    }
  };

  const handleDelete = (id: string) => {
    setArchivedData((prevData) =>
      prevData.filter((offer: Offers) => offer._id !== id)
    );
  };

  const deleteAllOffers = async () => {
    if (window.confirm("Vous voulez vraiment supprimer toutes les offres ?")) {
      try {
        await Promise.all(
          archivedData.map((offer) =>
            axios.delete(
              `${import.meta.env.VITE_OFFER_URL}/archive/${offer._id}`
            )
          )
        );
        fetchArchivedOffers();
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de toutes les offres : ",
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchArchivedOffers();
  }, []);

  return (
    <div>
      <Navbar />
      <WordFadeIn
        words="Les offres archivées !"
        delay={0.075}
        className="font-title tracking-wide text-green-600"
      />
      <ul className="flex flex-col items-center justify-center gap-5 overflow-hidden py-4">
        {archivedData.length === 0 ? (
            <FindNothingText />
        ) : (
          archivedData.map((offer: Offers) => (
            <CardArchived
              key={offer._id}
              offer={offer}
              onDelete={handleDelete}
              onArchiveToggle={handleArchiveToggle}
            />
          ))
        )}
      </ul>
      {archivedData.length > 1 && (
        <div className="flex justify-center py-3">
          <ButtonOffers onClick={deleteAllOffers}>
            <p className="rounded-md border px-4 py-2 font-title shadow-md  transition-transform hover:scale-105 hover:animate-pulse hover:bg-red-400 hover:font-bold">
              Supprimer toutes les offres
            </p>
          </ButtonOffers>
        </div>
      )}
    </div>
  );
};

export default Archive;
