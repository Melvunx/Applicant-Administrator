import { Typography } from "@material-tailwind/react";
import TypingAnimation from "../ui/typing-animation";

const FindNothingText = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Typography as="p" color="deep-purple" variant="h3">
        <TypingAnimation
          text="Aucune offre archivée n'a été trouvée"
          className="font-title"
        />
      </Typography>
    </div>
  );
};

export default FindNothingText;
