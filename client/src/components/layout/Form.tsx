import axios from "axios";
import { useState } from "react";

interface FormProps {
  refreshOffers: () => void;
}

const Form: React.FC<FormProps> = ({ refreshOffers }) => {
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

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Ajouter une demande d'alternance</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-2/5 flex-col items-center justify-center gap-3 rounded-lg bg-zinc-300 p-6 shadow-lg"
      >
        <div className="flex gap-3">
          {type !== "Candidature spontanée" && (
            <div className="flex flex-col items-center justify-center gap-1">
              <label htmlFor="title" className="">
                Titre de l'offre
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-1">
            <label htmlFor="type" className="">
              Type de demande
            </label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
        <div className="flex flex-col items-center justify-center gap-1">
          <label htmlFor="company" className="">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <label htmlFor="url">Lien de l'offre</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <label htmlFor="apply">Date de candidature</label>
          <input
            type="date"
            value={applyDate}
            onChange={(e) => setApplyDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pas envoyé">Pas envoyé</option>
            <option value="Envoyé">Envoyé</option>
            <option value="Refusé">Refusé</option>
            <option value="Accepté">Accepté</option>
          </select>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Form;
