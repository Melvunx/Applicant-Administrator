import Footer from "@/components/Footer";
import ButtonOffers from "@/components/layout/ButtonOffers";
import FilterStatus from "@/components/layout/FilterStatus";
import FindNothingText from "@/components/layout/FindNothingText";
import OfferCounter from "@/components/layout/OfferCounter";
import Navbar from "@/components/Navbar";
import WordFadeIn from "@/components/ui/word-fade-in";
import CardArchived from "@layout/CardArchived";
import axios from "axios";
import { useEffect, useState } from "react";
import { Offers } from "./Home";

const Archive = () => {
  const [archivedData, setArchivedData] = useState<Offers[]>([]);
  const [filteredData, setFilteredData] = useState<Offers[]>([]); // État pour les données filtrées
  const [, setSelectedStatus] = useState<string>(""); // État pour le statut sélectionné

  // Récupération des offres archivées depuis l'API
  const fetchArchivedOffers = async () => {
    await axios.get(import.meta.env.VITE_OFFER_URL).then((res) => {
      const archivedOffers = res.data.map((offer: Offers) => ({
        ...offer,
        applyDate: new Date(offer.applyDate),
      }));
      const filteredArchivedOffers = archivedOffers.filter(
        (offer: Offers) => offer.archived === true
      );
      setArchivedData(filteredArchivedOffers);
      setFilteredData(filteredArchivedOffers); // Initialiser les données filtrées
    });
  };

  // Fonction de filtrage basée sur le statut sélectionné
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status); // Mettre à jour le statut sélectionné
    if (status) {
      const filteredOffers = archivedData.filter(
        (offer: Offers) => offer.status === status
      );
      setFilteredData(filteredOffers); // Filtrer les données
    } else {
      setFilteredData(archivedData); // Réinitialiser si aucun filtre n'est sélectionné
    }
  };

  // Mise à jour de l'archivage d'une offre
  const handleArchiveToggle = async (id: string, isArchived: boolean) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_OFFER_URL}/${id}/archive`,
        { archived: isArchived }
      );
      console.log(res.data.message);
      fetchArchivedOffers(); // Rafraîchir les données après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'archivage", error);
    }
  };

  // Suppression d'une offre
  const handleDelete = (id: string) => {
    setArchivedData((prevData) =>
      prevData.filter((offer: Offers) => offer._id !== id)
    );
  };

  // Suppression de toutes les offres archivées
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

      {/* Composant de filtrage par statut */}
      <FilterStatus onFilter={handleStatusFilter} />

      {filteredData.length > 0 && (
        <OfferCounter
          offerList={filteredData}
          className="font-bold italic text-green-400"
        />
      )}
      {/* Affichage des offres filtrées */}
      <ul className="flex min-h-screen flex-col items-center justify-start gap-5 overflow-hidden py-4">
        {filteredData.length === 0 ? (
          <FindNothingText offerPage="archivée" />
        ) : (
          filteredData.map((offer: Offers) => (
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
          <ButtonOffers
            className="rounded-md border px-4 py-2 font-title shadow-md  transition-transform hover:scale-105 hover:animate-pulse hover:bg-red-400 hover:font-bold"
            onClick={deleteAllOffers}
          >
            Supprimer toutes les offres
          </ButtonOffers>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Archive;
