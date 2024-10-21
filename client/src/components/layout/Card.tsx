import { Button } from "@material-tailwind/react";
import axios from "axios";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Offers } from "../../Pages/Home";
import { BorderBeam } from "../ui/border-beam";
import Particles from "../ui/particles";
import ButtonOffers from "./ButtonOffers";

interface CardProps {
  offer: Offers;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
}

const Card = ({ offer, onArchiveToggle }: CardProps) => {
  const [isClicked, setIsClick] = useState(false);
  const [status, setStatus] = useState<string>(offer.status); // Assurez-vous que le type de status est bien string

  useEffect(() => {
    setStatus(offer.status); // Réinitialisation du statut à chaque mise à jour d'offer
  }, [offer.status]);

  const toggleArchiveOffer = async () => {
    const action = offer.archived ? "désarchiver" : "archiver";
    if (window.confirm(`Vous voulez vraiment ${action} cette offre ?`)) {
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

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await axios.put(`${import.meta.env.VITE_OFFER_URL}/${offer._id}/status`, {
        status: newStatus,
      });
      console.log(`Statut mis à jour : ${newStatus}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut : ", error);
      setStatus(offer.status);
    }
  };

  return (
    <div className="relative flex size-32 items-center justify-between rounded-lg bg-gray-200/60 p-5 shadow-lg lg:w-3/4 lg-max:h-full lg-max:w-4/5 lg-max:flex-col lg-max:gap-5">
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
        className="absolute left-0 top-0 size-full"
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
        <h1 className="cursor-default font-title font-bold lg:text-sm lg-max:text-lg">
          {offer.type}
        </h1>
      ) : (
        <h1 className="cursor-default font-title font-bold lg:text-sm lg-max:text-lg">
          {offer.title}
        </h1>
      )}
      <a
        href={offer.url}
        className="rounded-md px-3 py-2 font-global font-semibold italic underline transition-transform hover:scale-105 hover:not-italic hover:text-cyan-800"
      >
        {offer.company}
      </a>
      <div className="flex items-center justify-around lg:w-1/3 lg-max:w-4/5">
        {isClicked ? (
          <select
            className="rounded-lg bg-black/60 p-1 text-center font-title text-white"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Pas envoyé">Pas envoyé</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Refusé">Refusé</option>
            <option value="Accepté">Accepté</option>
          </select>
        ) : (
          <p
            className={`cursor-default rounded-lg p-1 font-global font-medium italic tracking-wide shadow-md ${colorSelector()}`}
          >
            {status}
          </p>
        )}
        <Button
          variant="outlined"
          onClick={() => setIsClick(!isClicked)} // Un seul clic pour éditer
          className="rounded-lg p-1 shadow-md transition-colors hover:bg-blue-200 hover:font-bold"
        >
          <PenLine size={22} strokeWidth={1.5} />
        </Button>
      </div>
      <ButtonOffers
        className="rounded-md border p-1 font-title shadow-md  transition-transform hover:scale-105 hover:animate-pulse hover:bg-lime-200 hover:font-bold"
        onClick={toggleArchiveOffer}
      >
        {offer.archived ? "Désarchiver" : "Archiver"}
      </ButtonOffers>
      <p className="cursor-default font-global text-sm font-medium capitalize">
        {new Date(offer.applyDate).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </p>
    </div>
  );
};

export default Card;
