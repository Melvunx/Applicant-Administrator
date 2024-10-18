import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [status, setStatus] = useState("Pas encore envoyée");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(import.meta.env.VITE_ADD_OFFER_URL, {
        title,
        company,
        url,
        applyDate,
        status,
      });
      console.log("Offre ajoutée : ", res.data);
      setTitle("");
      setCompany("");
      setUrl("");
      setApplyDate("");
      setStatus("");
    } catch (err) {
      console.error("Erreur lors de l'ajout d'offre : " + err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Ajouter une demande d'alternance</h1>
        <div className="">
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
        <div className="">
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
        <div>
          <label htmlFor="url">Lien de l'offre</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="apply">Date de candidature</label>
          <input
            type="date"
            value={applyDate}
            onChange={(e) => setApplyDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" onChange={(e) => setStatus(e.target.value)}>
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
