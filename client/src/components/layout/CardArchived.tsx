import axios from "axios";
import { Offers } from "../../Pages/Home";

interface CardArchivedProps {
  offer: Offers;
  onDelete: (id: string) => void;
}

const CardArchived = ({ offer, onDelete }: CardArchivedProps) => {
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
      {/* <button onClick={archiveOffer}>Archiver</button> */}
      <button onClick={deleteOffer}>Supprimer</button>
    </div>
  );
};

export default CardArchived;
