import { Offers } from "@/Pages/Home";
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

interface FilterProps {
  offers: Offers[];
  onFilter: (filteredOffers: Offers[]) => void;
}

const Filter = ({ offers, onFilter }: FilterProps) => {
  const [filterType, setFilterType] = useState<string>("");

  // Fonction de filtrage des offres
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType =
      e.target.id === "candidature-offre"
        ? "Candidature sur offre"
        : "Candidature spontanée";
    setFilterType(selectedType);

    const filteredOffers = offers.filter(
      (offer) => offer.type === selectedType
    );
    onFilter(filteredOffers);
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilterType(""); // Réinitialise l'état
    onFilter(offers); // Renvoie toutes les offres sans filtre
  };

  return (
    <Card
      className="mx-auto w-3/4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List
        className="flex lg:flex-row lg-max:flex-col lg-max:gap-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ListItem
          className="p-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <label
            htmlFor="candidature-offre"
            className="flex w-full cursor-pointer items-center justify-center px-3 py-2"
          >
            <ListItemPrefix
              className="mr-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Radio
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                name="offre-filter"
                id="candidature-offre"
                checked={filterType === "Candidature sur offre"}
                onChange={handleFilterChange}
                ripple={false}
                color="blue"
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="blue-gray"
              className="font-global font-medium tracking-wide text-blue-gray-400 hover:text-indigo-700"
            >
              Candidature sur offre
            </Typography>
          </label>
        </ListItem>
        {/* Candidature spontanée */}
        <ListItem
          className="p-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <label
            htmlFor="candidature-spontanée"
            className="flex w-full  cursor-pointer items-center justify-center px-3 py-2"
          >
            <ListItemPrefix
              className="mr-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Radio
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                name="offre-filter"
                id="candidature-spontanée"
                color="amber"
                checked={filterType === "Candidature spontanée"}
                onChange={handleFilterChange}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
                crossOrigin={undefined}
              />
            </ListItemPrefix>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="blue-gray"
              className="font-global font-medium tracking-wide text-blue-gray-400 hover:text-indigo-700"
            >
              Candidature spontanée
            </Typography>
          </label>
        </ListItem>
        {/* Bouton de réinitialisation sur la même ligne */}
        <ListItem
          className="flex justify-center p-0"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {" "}
          {/* Ajout d'une marge à gauche pour espacer */}
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={resetFilters}
            variant="text"
            className="w-full font-title tracking-wider text-blue-gray-400 hover:text-indigo-700 hover:underline"
          >
            Réinitialiser le filtre
          </Button>
        </ListItem>
      </List>
    </Card>
  );
};

export default Filter;
