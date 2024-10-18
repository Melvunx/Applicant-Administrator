import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [status, setStatus] = useState("Pas encore envoyée");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(import.meta.env.VITE_ADD_OFFER_URL, {
        title,
        company,
        url,
        applyDate,
        status,
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout d'offre : " + err);
    }
  };

  return (
    <div>
      <form></form>
    </div>
  );
};

export default Form;
