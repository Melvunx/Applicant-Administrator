import axios from "axios";
import { Offers } from "../../Pages/Home";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { BorderBeam } from "../ui/border-beam";
import Particles from "../ui/particles";

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
    <div className="relative flex  size-32 items-center justify-between rounded-lg p-5 shadow-md lg:w-3/4 lg-max:h-full lg-max:w-4/5 lg-max:flex-col lg-max:gap-5">
      <BorderBeam
        size={handleRandomUnits(300)}
        duration={handleRandomUnits(15)}
        anchor={90}
        borderWidth={1.6}
        colorFrom="#FDFC47"
        colorTo="#65A30D"
        delay={handleRandomUnits(10)}
      />
      <Particles
        className="absolute  left-0 top-0 size-full"
        quantity={100}
        staticity={50}
        ease={50}
        size={0.2}
        refresh
        color="#65A30D"
        vx={0}
        vy={0}
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
          className="border-zinc-400 hover:border-zinc-600 rounded-md border p-1 shadow-md transition-transform hover:scale-105 hover:bg-lime-200 hover:font-bold"
        >
          {offer.archived ? "Désarchiver" : "Archiver"}
        </button>
      </AnimatedShinyText>
      <button onClick={deleteOffer}>Supprimer</button>
    </div>
  );
};

export default CardArchived;
