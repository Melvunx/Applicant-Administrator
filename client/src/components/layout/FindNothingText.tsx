import { Typography } from "@material-tailwind/react";
import TypingAnimation from "../ui/typing-animation";

interface FNTProps {
  offerPage: string;
}

const FindNothingText: React.FC<FNTProps> = ({ offerPage }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Typography as="p" color="deep-purple" variant="h3">
        <TypingAnimation
          text={`Aucune offre ${offerPage} n'a été trouvée`}
          duration={65}
          className="font-title"
        />
      </Typography>
    </div>
  );
};

export default FindNothingText;
