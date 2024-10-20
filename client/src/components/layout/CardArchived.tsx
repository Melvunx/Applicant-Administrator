import axios from "axios";
import { Offers } from "../../Pages/Home";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { BorderBeam } from "../ui/border-beam";

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

  const handleRandomUnits = (max: number): number => {
    const min = max / 4;
    const units = Math.ceil(Math.random() * max + min);
    return units;
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
    <div className="relative flex  size-32 items-center justify-between rounded-lg p-5 shadow-md max-lg:h-full max-lg:w-4/5 max-lg:flex-col max-lg:gap-5 lg:w-3/4">
      <BorderBeam
        size={handleRandomUnits(300)}
        duration={handleRandomUnits(15)}
        anchor={90}
        borderWidth={1.6}
        colorFrom="#FDFC47"
        colorTo="#65A30D"
        delay={handleRandomUnits(10)}
      />
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
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
        <button
          onClick={toggleArchiveOffer}
          className="rounded-md border border-zinc-400 p-1 shadow-md transition-transform hover:scale-105 hover:border-zinc-600 hover:bg-lime-200 hover:font-bold"
        >
          {offer.archived ? "Désarchiver" : "Archiver"}
        </button>
      </AnimatedShinyText>
      <button onClick={deleteOffer}>Supprimer</button>
    </div>
  );
};

export default CardArchived;
