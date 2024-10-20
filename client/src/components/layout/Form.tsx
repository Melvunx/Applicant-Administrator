import axios from "axios";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import Particles from "../ui/particles";
import SparklesText from "../ui/sparkles-text";

interface FormProps {
  refreshOffers: () => void;
}

const Form: React.FC<FormProps> = ({ refreshOffers }) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Candidature sur offre");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [status, setStatus] = useState("Pas envoyée");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(import.meta.env.VITE_ADD_OFFER_URL, {
        type,
        title: type === "Candidature sur offre" ? title : undefined,
        company,
        url,
        applyDate,
        status,
      });
      console.log("Offre ajoutée : ", res.data);

      refreshOffers();

      setTitle("");
      setType("Candidature sur offre");
      setCompany("");
      setUrl("");
      setApplyDate("");
      setStatus("Pas envoyée");
    } catch (err) {
      console.error("Erreur lors de l'ajout d'offre : " + err);
    }
  };

  const colors = {
    first: "#36D1DC",
    second: "#5B86E5",
  };

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <h1 className="py-16">
        {" "}
        <SparklesText
          className="text-center font-title text-3xl"
          text="Ajouter une demande d'alternance"
          sparklesCount={10}
          colors={colors}
        />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center gap-3 rounded-lg bg-zinc-200/60 p-6 shadow-lg max-lg:w-4/5 lg:w-3/5"
      >
        <Particles
          className="absolute  left-0 top-0 size-full"
          quantity={125}
          staticity={50}
          ease={50}
          size={0.4}
          refresh
          color="#5B86E5"
          vx={0}
          vy={0}
        />
        <div className="flex items-center justify-evenly max-lg:flex-col max-lg:gap-4 lg:w-4/5">
          {type !== "Candidature spontanée" && (
            <div
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4 ${
                focusedInput === "title" ? "bg-cyan-700/40" : ""
              } `}
            >
              <label htmlFor="title" className="font-title">
                Titre de l'offre
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => handleFocus("title")}
                onBlur={handleBlur}
                required
              />
            </div>
          )}
          <div
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4  ${
              focusedInput === "type" ? "bg-cyan-700/40" : ""
            }`}
          >
            <label htmlFor="type" className="font-title">
              Type de demande
            </label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              onFocus={() => handleFocus("type")}
              onBlur={handleBlur}
            >
              <option value="Candidature sur offre">
                Candidature sur offre
              </option>
              <option value="Candidature spontanée">
                Candidature spontanée
              </option>
            </select>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4 ${
            focusedInput === "company" ? "bg-cyan-700/40" : ""
          }`}
        >
          <label htmlFor="company" className="font-title">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onFocus={() => handleFocus("company")}
            onBlur={handleBlur}
            required
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4 ${
            focusedInput === "url" ? "bg-cyan-700/40" : ""
          }`}
        >
          <label htmlFor="url" className="font-title">
            Lien de l'offre
          </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => handleFocus("url")}
            onBlur={handleBlur}
            required
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4 ${
            focusedInput === "apply" ? "bg-cyan-700/40" : ""
          }`}
        >
          <label htmlFor="apply" className="font-title">
            Date de candidature
          </label>
          <input
            type="date"
            name="apply"
            value={applyDate}
            onChange={(e) => setApplyDate(e.target.value)}
            onFocus={() => handleFocus("apply")}
            onBlur={handleBlur}
            required
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-4 ${
            focusedInput === "status" ? "bg-cyan-700/40" : ""
          }`}
        >
          <label htmlFor="status" className="font-title">
            Status
          </label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            onFocus={() => handleFocus("status")}
            onBlur={handleBlur}
          >
            <option value="Pas envoyé">Pas envoyé</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Refusé">Refusé</option>
            <option value="Accepté">Accepté</option>
          </select>
        </div>
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
          <button
            type="submit"
            className="rounded-md border border-zinc-400 bg-zinc-50 px-7 py-1 shadow-md transition-transform hover:scale-105 hover:animate-pulse hover:border-zinc-600 hover:bg-lime-300 hover:font-bold"
          >
            <CalendarPlus size={22} strokeWidth={1.25} />
          </button>
        </AnimatedShinyText>
      </form>
    </div>
  );
};

export default Form;
