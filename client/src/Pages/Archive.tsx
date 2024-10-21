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
          <p>Aucune offre archivée trouvée</p>
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
    </div>
  );
};

export default Archive;
