import React from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";

interface ButtonOffersProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonOffers: React.FC<ButtonOffersProps> = ({ onClick, children }) => {
  return (
    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
      <button onClick={onClick}>{children}</button>
    </AnimatedShinyText>
  );
};

export default ButtonOffers;
