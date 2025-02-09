import { createOffer } from "@/api/offer";
import ErrorPage from "@/pages/ErrorPage";
import { OfferResponseData } from "@/schema/offer.schema";
import userAuthStore from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

export default function OfferForm() {
  const [isCheckedToggle, setIsCheckedToggle] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [titre, setTitre] = useState("");
  const navigate = useNavigate();
  const { accessToken, setAccessToken, user } = userAuthStore();
  const queryClient = useQueryClient();

  const openModal = () => {
    const modalForm = document.getElementById("modal-form");

    if (!modalForm) {
      throw new Error("Modal form not found");
    }

    modalForm.showModal();
  };

  const closeModal = () => {
    const modalForm = document.getElementById("modal-form");

    if (!modalForm) {
      throw new Error("Modal form not found");
    }

    modalForm.close();
  };

  const {
    mutate: createOfferMutation,
    isPending: isCreatingOffer,
    isError,
    error,
  } = useMutation({
    mutationKey: ["create-offer"],
    mutationFn: async (data: OfferResponseData) =>
      await createOffer({ navigate, data, accessToken, setAccessToken }),
    onSuccess: (data, variables) => {
      setTitre("");

      console.log("Offer data send to server", { data, variables });

      queryClient.invalidateQueries({ queryKey: ["offers"] });
      setTimeout(() => closeModal(), 175);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleToggleChange = () => {
    if (isCheckedToggle) {
      setTitre("");
    }
    setIsCheckedToggle(!isCheckedToggle);
  };

  const onCreateOfferAction = async (data: FormData) => {
    if (!user) {
      throw new Error("User not found");
    }

    const title = String(data.get("title"));
    const expireDate = String(data.get("expireDate"));

    const formData = {
      title: title === "null" ? title.toUpperCase() : title,
      type: String(data.get("type")) as "SPONTANEOUS" | "BYOFFER",
      company: String(data.get("company")),
      url: String(data.get("url")),
      status: String(data.get("status")) as
        | "PENDING"
        | "INTERVIEW"
        | "REJECTED"
        | "ACCEPTED",
      location: String(data.get("location")),
      applyDate: new Date(String(data.get("applyDate"))),
      expireDate: expireDate === "" ? undefined : new Date(expireDate),
      userId: user.id,
    };

    try {
      createOfferMutation(formData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isError) return <ErrorPage />;

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="tooltip tooltip-bottom" data-tip="Ajouter une offre">
        <button
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
          className="btn btn-circle transition-transform"
          onClick={openModal}
        >
          <PlusIcon
            size={24}
            className={
              isHoveringButton
                ? "dark:text-primary light:text-secondary-content"
                : ""
            }
          />
        </button>
      </div>
      <dialog id="modal-form" className="modal">
        <form
          action={onCreateOfferAction}
          className="modal-box font-content-nunito flex flex-col"
        >
          <fieldset className="fieldset gap-3 mx-auto w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Ajouter une offre</legend>

            <label className="fieldset-label">Titre</label>
            <input
              name="title"
              className="input"
              placeholder="Titre..."
              disabled={isCheckedToggle}
              value={titre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitre(e.target.value)
              }
            />

            <input
              type="hidden"
              name="type"
              value={isCheckedToggle ? "SPONTANEOUS" : "BYOFFER"}
            />

            <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
              <legend className="fieldset-legend font-title tracking-wide">
                Type d'offre
              </legend>

              <label
                className={`fieldset-label font-content-m-plus tracking-wide transition-colors ${
                  isCheckedToggle ? "dark:text-success light:text-accent" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isCheckedToggle}
                  onChange={handleToggleChange}
                  className="toggle"
                />
                Candidature spontanée *
              </label>
            </fieldset>

            <label className="fieldset-label">Entreprise *</label>
            <input
              name="company"
              className="input"
              placeholder="Entreprise..."
            />

            <label className="fieldset-label">Url *</label>
            <input
              className="input"
              name="url"
              type="url"
              placeholder="Url..."
            />

            <select
              name="status"
              defaultValue="Sélectionne un status"
              className="select"
            >
              <option disabled={true}>Sélectionne un status</option>
              <option value="PENDING">En attente</option>
              <option value="INTERVIEW">Interview en approche</option>
              <option value="REJECTED">Rejeté</option>
              <option value="ACCEPTED">Accepté</option>
            </select>

            <label className="fieldset-label">Lieu</label>
            <input name="location" className="input" placeholder="Lieux..." />

            <label className="fieldset-label">Date de postulation *</label>
            <input type="date" name="applyDate" className="input" />

            <label className="fieldset-label">Date d'expiration</label>
            <input type="date" name="expireDate" className="input" />
          </fieldset>

          <div className="modal-action">
            <Button id="modal-btn" type="submit" loading={isCreatingOffer}>
              Ajouter
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
}
