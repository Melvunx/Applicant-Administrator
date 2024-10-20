import axios from "axios";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { Offers } from "../../Pages/Home";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { BorderBeam } from "../ui/border-beam";
import Particles from "../ui/particles";

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

  const handleRandomUnits = (max: number): number => {
    const min = max / 4;
    const units = Math.ceil(Math.random() * max + min);
    return units;
  };

  const colorSelector = () => {
    let background: string;

    switch (status) {
      case "Pas envoyé":
        background = "bg-orange-400/50";
        break;
      case "Envoyé":
        background = "bg-sky-500/50";
        break;
      case "Refusé":
        background = "bg-red-600/50";
        break;
      case "Accepté":
        background = "bg-lime-500/50";
        break;
      default:
        background = "bg-gray-300/50";
        break;
    }

    return background;
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
    <div className="relative flex size-32 items-center justify-between rounded-lg bg-zinc-200/40 p-5 shadow-lg max-lg:h-full max-lg:w-4/5 max-lg:flex-col max-lg:gap-5 lg:w-3/4">
      <BorderBeam
        size={handleRandomUnits(300)}
        duration={handleRandomUnits(15)}
        anchor={90}
        borderWidth={1.6}
        colorFrom="#ffaa40"
        colorTo="#9c40ff"
        delay={handleRandomUnits(10)}
      />
      <Particles
        className="absolute  left-0 top-0 size-full"
        quantity={100}
        staticity={50}
        ease={50}
        size={0.2}
        refresh
        color="#243B55"
        vx={0}
        vy={0}
      />
      {offer.type === "Candidature spontanée" ? (
        <h1 className="cursor-default font-title font-bold   max-lg:text-lg lg:text-sm">
          {offer.type}
        </h1>
      ) : (
        <h1 className="cursor-default font-title font-bold  max-lg:text-lg lg:text-sm">
          {offer.title}
        </h1>
      )}
      <a
        href={offer.url}
        className="rounded-md px-3  py-2 font-global font-semibold italic underline transition-transform hover:scale-105 hover:not-italic hover:text-cyan-800"
      >
        {offer.company}
      </a>
      <div className="flex items-center justify-around max-lg:w-3/5 lg:w-1/3">
        {isClicked ? (
          <select value={status} onChange={handleStatusChange}>
            <option value="Pas envoyé">Pas envoyé</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Refusé">Refusé</option>
            <option value="Accepté">Accepté</option>
          </select>
        ) : (
          <p
            className={`cursor-default rounded-lg  p-1 font-global font-light italic tracking-wide shadow-md ${colorSelector()}`}
          >
            {status}
          </p>
        )}
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
          <button
            onClick={() => setIsClick(false)}
            onDoubleClick={() => setIsClick(true)}
            className="rounded-md border border-zinc-400  p-1 shadow-md transition-transform hover:scale-125 hover:animate-pulse hover:border-zinc-600 hover:bg-blue-200 hover:font-bold"
          >
            <PenLine size={22} strokeWidth={1.5} />
          </button>
        </AnimatedShinyText>
      </div>
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
        <button
          onClick={toggleArchiveOffer}
          className="rounded-md border border-zinc-400 p-1 shadow-md transition-transform hover:scale-105 hover:animate-pulse hover:border-zinc-600 hover:bg-lime-200 hover:font-bold"
        >
          {offer.archived ? "Désarchiver" : "Archiver"}
        </button>
      </AnimatedShinyText>
      <p className="cursor-default font-global text-sm font-medium capitalize">
        {offer.applyDate.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </p>
    </div>
  );
};

export default Card;
