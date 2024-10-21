import {
  Button,
  Input,
  Option,
  Select,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import Particles from "../ui/particles";
import SparklesText from "../ui/sparkles-text";

interface FormProps {
  refreshOffers: () => void;
}

const Form: React.FC<FormProps> = ({ refreshOffers }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Candidature sur offre");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [status, setStatus] = useState("Pas envoyé");

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
      setStatus("Pas envoyé");
    } catch (err) {
      console.error("Erreur lors de l'ajout d'offre : " + err);
    }
  };

  const colors = {
    first: "#36D1DC",
    second: "#5B86E5",
  };

  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <h1 className="w-full overflow-hidden py-16">
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
        className="relative flex flex-col items-center justify-center gap-3 rounded-lg bg-amber-200/30 p-6 shadow-lg lg:w-3/5 lg-max:w-4/5"
      >
        <Particles
          className="absolute  left-0 top-0 size-full"
          quantity={150}
          staticity={70}
          ease={50}
          size={0.4}
          refresh
          color="#5B86E5"
          vx={0}
          vy={0}
        />
        <div className="flex flex-col gap-6  lg:w-3/4 lg-max:gap-8">
          {type !== "Candidature spontanée" && (
            <div className="">
              <Input
                type="text"
                className="font-title tracking-wider"
                color="blue"
                name="title"
                list="defaultTitle"
                variant="standard"
                placeholder="Ex : Développeur"
                value={title}
                label="Titre de l'offre"
                onChange={(e) => setTitle(e.target.value)}
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <datalist id="defaultTitle">
                <option value="Développeur Web"></option>
                <option value="Développeur Front-End"></option>
              </datalist>
            </div>
          )}

          <Select
            name="type"
            value={type}
            label="Type de demande"
            className="font-title tracking-wider"
            color="blue"
            variant="static"
            onChange={(value) => setType(value as string)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option
              className="text-center font-title"
              value="Candidature sur offre"
            >
              Candidature sur offre
            </Option>
            <Option
              className="text-center font-title"
              value="Candidature spontanée"
            >
              Candidature spontanée
            </Option>
          </Select>

          <Input
            type="text"
            className="font-title tracking-wider"
            color="blue"
            name="company"
            variant="standard"
            placeholder="Ex : Séphora"
            value={company}
            label="Nom de l'entreprise"
            onChange={(e) => setCompany(e.target.value)}
            required
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />

          <Input
            type="url"
            variant="standard"
            className="font-title tracking-wider"
            color="blue"
            placeholder="Url du lien"
            name="url"
            value={url}
            label="Lien de l'offre"
            onChange={(e) => setUrl(e.target.value)}
            required
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />

          <Input
            type="date"
            name="apply"
            className="font-title tracking-wider"
            color="blue"
            value={applyDate}
            label="Date de candidature"
            variant="standard"
            placeholder="Today"
            onChange={(e) => setApplyDate(e.target.value)}
            required
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />

          <Select
            name="status"
            variant="static"
            className="font-title tracking-wider"
            color="blue"
            value={status}
            label="Status Candidature"
            onChange={(value) => setStatus(value as string)} // Modifier ici
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <Option className="text-center font-title" value="Pas envoyé">
              Pas envoyé
            </Option>
            <Option className="text-center font-title" value="Envoyé">
              Envoyé
            </Option>
            <Option className="text-center font-title" value="Refusé">
              Refusé
            </Option>
            <Option className="text-center font-title" value="Accepté">
              Accepté
            </Option>
          </Select>
        </div>
        <Tooltip
          content="Ajouter l'offre"
          placement="bottom"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: -25 },
          }}
        >
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            type="submit"
            variant="outlined"
            className="rounded-md border border-brown-700 bg-blue-gray-50 px-7 py-1 shadow-md transition-colors hover:border-gray-600 hover:bg-green-400"
          >
            <CalendarPlus size={22} strokeWidth={1.25} />
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};

export default Form;
