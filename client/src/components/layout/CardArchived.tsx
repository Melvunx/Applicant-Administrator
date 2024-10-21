import axios from "axios";
import { Offers } from "../../Pages/Home";
import { BorderBeam } from "../ui/border-beam";
import Particles from "../ui/particles";
import ButtonOffers from "./ButtonOffers";
import { Tooltip } from "@material-tailwind/react";

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

  const colorSelector = (status) => {
    switch (status) {
      case "Pas envoyé":
        return "bg-orange-500/50";
      case "Envoyé":
        return "bg-indigo-300/50";
      case "Refusé":
        return "bg-red-500/50";
      case "Accepté":
        return "bg-green-500/50";
      default:
        return "bg-gray-300/50";
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
    <div className="relative flex  size-32 items-center justify-between rounded-lg bg-gray-200/60 p-5 shadow-md lg:w-3/4 lg-max:h-full lg-max:w-4/5 lg-max:flex-col lg-max:gap-5">
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
        <h1 className="cursor-default font-title font-bold lg:text-sm lg-max:text-lg">
          {offer.type}
        </h1>
      ) : (
        <h1 className="cursor-default font-title font-bold lg:text-sm lg-max:text-lg">
          {offer.title}
        </h1>
      )}
      <p
        className={`${colorSelector(
          offer.status
        )} cursor-default rounded-lg p-1 font-global font-medium italic tracking-wide shadow-md  `}
      >
        {offer.status}
      </p>
      <Tooltip
        content="Lien de la candidature"
        placement="bottom"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: -35 },
        }}
      >
        <a
          href={offer.url}
          className="rounded-md px-3 py-2 font-global font-semibold italic underline transition-transform hover:scale-105 hover:not-italic hover:text-cyan-800"
        >
          {offer.company}
        </a>
      </Tooltip>
      <p className="cursor-default font-global text-sm font-medium capitalize">
        {new Date(offer.applyDate).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </p>
      <ButtonOffers
        className="rounded-md border p-1 font-title shadow-md  transition-transform hover:scale-105 hover:animate-pulse hover:bg-indigo-200 hover:font-bold"
        onClick={toggleArchiveOffer}
      >
        {offer.archived ? "Désarchiver" : "Archiver"}
      </ButtonOffers>
      <ButtonOffers
        className="rounded-md border p-1 font-title shadow-md  transition-transform hover:scale-105 hover:animate-pulse hover:bg-red-400 hover:font-bold"
        onClick={deleteOffer}
      >
        Supprimer
      </ButtonOffers>
    </div>
  );
};

export default CardArchived;
