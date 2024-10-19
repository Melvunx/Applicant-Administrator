import axios from "axios";
import { Offers } from "../../Pages/Home";

interface CardProps {
  offer: Offers;
  onArchive: (id: string) => void;
}

const Card = ({ offer, onArchive }: CardProps) => {
  const archiveOffer = async () => {
    if (window.confirm("Vous voulez vraiment archiver cette offre ?")) {
      try {
        await axios.put(
          `${import.meta.env.VITE_OFFER_URL}/${offer._id}/archive`
        );
        onArchive(offer._id);
      } catch (error) {
        console.error("L'offre n'a pas pu être archivée ! ", error);
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
      <button onClick={archiveOffer}>Archiver</button>
    </div>
  );
};

export default Card;
