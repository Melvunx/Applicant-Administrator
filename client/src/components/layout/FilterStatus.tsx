import {
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import { useState } from "react";

interface StatusFilterProps {
  onFilter: (filteredStatus: string) => void; // Fonction de callback pour renvoyer le statut sélectionné
}

const FilterStatus = ({ onFilter }: StatusFilterProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value;
    setSelectedStatus(status); // Met à jour l'état du statut sélectionné
    onFilter(status); // Envoie le statut sélectionné au parent
  };

  const handleReset = () => {
    setSelectedStatus(""); // Réinitialise l'état
    onFilter(""); // Envoie une chaîne vide pour réinitialiser le filtre
  };

  const statusColor = (status: string): colors | undefined => {
    switch (status) {
      case "Pas envoyé":
        return "orange"; // Assurez-vous que "orange" est un type de couleur valide
      case "Envoyé":
        return "indigo";
      case "Refusé":
        return "red";
      case "Accepté":
        return "green";
      default:
        return undefined; // Retourne undefined si le statut ne correspond pas
    }
  };

  return (
    <Card
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="mx-auto w-3/4"
    >
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="flex lg:flex-row lg-max:flex-col"
      >
        {["Pas envoyé", "Envoyé", "Refusé", "Accepté"].map((status) => (
          <ListItem
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            key={status}
            className="p-0"
          >
            <label
              htmlFor={`status-${status}`}
              className="flex items-center px-3 py-2 sm:w-2/5 md:w-3/12 lg:w-full lg:justify-center lg:gap-2 lg-max:mx-auto"
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="mr-3"
              >
                <Radio
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  name="status"
                  id={`status-${status}`}
                  value={status}
                  color={statusColor(status)}
                  onChange={handleStatusChange}
                  ripple={false}
                  checked={selectedStatus === status} // Vérifie si le statut est sélectionné
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
                className="font-medium text-blue-gray-400"
              >
                {status}
              </Typography>
            </label>
          </ListItem>
        ))}
        {/* Bouton de réinitialisation */}
        <ListItem
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="p-0"
        >
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleReset}
            variant="text"
            className="w-full font-title tracking-wider text-blue-gray-400 hover:text-lime-700 hover:underline"
          >
            Réinitialiser le filtre
          </Button>
        </ListItem>
      </List>
    </Card>
  );
};

export default FilterStatus;
