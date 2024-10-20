import axios from "axios";
import { Offers } from "../../Pages/Home";

interface CardArchivedProps {
  offer: Offers;
  onDelete: (id: string) => void;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
}

const CardArchived = ({
  offer,
  onDelete,
  onArchiveToggle,
}: CardArchivedProps) => {
  const deleteOffer = async () => {
    if (window.confirm("Vous voulez vraiment supprimer cette offre ?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_OFFER_URL}/archive/${offer._id}`
        );
        onDelete(offer._id);
      } catch (error) {
        console.error("Cette offre n'a pas pu être supprimer ", error);
      }
    }
  };

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

  return (
    <div className="flex items-center justify-between rounded-md bg-orange-300 p-5 shadow-md max-lg:w-1/2 lg:w-3/4">
      {offer.type === "Candidature spontanée" ? (
        <h1 className="font-bold">{offer.type}</h1>
      ) : (
        <h1 className="font-bold">{offer.title}</h1>
      )}
      <p>
        {offer.company} - {offer.status}
      </p>
      <a href={offer.url}>Lien de l'offre</a>
      <p>
        {offer.applyDate.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <button onClick={toggleArchiveOffer}>
        {offer.archived ? "Désarchiver" : "Archiver"}
      </button>
      <button onClick={deleteOffer}>Supprimer</button>
    </div>
  );
};

export default CardArchived;
