import axios from "axios";
import { useState } from "react";
import { Offers } from "../../Pages/Home";

interface CardProps {
  offer: Offers;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
}

const Card = ({ offer, onArchiveToggle }: CardProps) => {
  const [isClicked, setIsClick] = useState(false);
  const [status, setStatut] = useState(offer.status);

  const toggleArchiveOffer = async () => {
    const action = offer.archived ? "désarchiver" : "archiver";
    if (window.confirm(`Vous voulez vraiment ${action} cette offer ?`)) {
      try {
        await axios.put(
          `${import.meta.env.VITE_OFFER_URL}/${offer._id}/archive`,
          { archived: !offer.archived }
        );
        onArchiveToggle(offer._id, !offer.archived);
      } catch (error) {
        console.error(`Cette offre n'a pas pu être ${action} ! `, error);
      }
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    setStatut(newStatus);
    try {
      await axios.put(`${import.meta.env.VITE_OFFER_URL}/${offer._id}/status`, {
        status: newStatus,
      });
      console.log(
        `Status de ${
          offer.type === "Candidature spontanée"
            ? `la candidature spontanée vers l'entreprise ${offer.company}`
            : `pour l'offre ${offer.title} de l'entreprise ${offer.company}`
        } a été modifié !`
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du status : ", error);
      setStatut(offer.status);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-orange-300 p-5 shadow-md max-lg:w-1/2 lg:w-3/4">
      {offer.type === "Candidature spontanée" ? (
        <h1 className="font-bold">{offer.type}</h1>
      ) : (
        <h1 className="font-bold">{offer.title}</h1>
      )}
      <a href={offer.url}>{offer.company}</a>
      <div className="flex w-1/3 justify-around">
        {isClicked ? (
          <select value={status} onChange={handleStatusChange}>
            <option value="Pas envoyé">Pas envoyé</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Refusé">Refusé</option>
            <option value="Accepté">Accepté</option>
          </select>
        ) : (
          <p>{status}</p>
        )}
        <button
          onClick={() => setIsClick(false)}
          onDoubleClick={() => setIsClick(true)}
        >
          Icon
        </button>
      </div>

      <button onClick={toggleArchiveOffer}>
        {offer.archived ? "Désarchiver" : "Archiver"}
      </button>
      <p>
        {offer.applyDate.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
    </div>
  );
};

export default Card;
