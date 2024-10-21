import React from "react";
import AnimatedShinyText from "../ui/animated-shiny-text";

interface ButtonOffersProps {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}

const ButtonOffers: React.FC<ButtonOffersProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </AnimatedShinyText>
  );
};

export default ButtonOffers;
