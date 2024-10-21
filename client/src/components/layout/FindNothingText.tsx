import { Button, Typography } from "@material-tailwind/react";
import { ArrowBigDownDash } from "lucide-react";
import TypingAnimation from "../ui/typing-animation";

interface FNTProps {
  offerPage: string;
}

const FindNothingText: React.FC<FNTProps> = ({ offerPage }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly">
      <Typography
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        as="p"
        color="deep-purple"
        variant="h3"
      >
        <TypingAnimation
          text={`Aucune offre ${offerPage} n'a été trouvée`}
          duration={65}
          className="font-title"
        />
      </Typography>
      <a href="#footer">
        <Button
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          variant="outlined"
          className="rounded-full"
          color="indigo"
        >
          <ArrowBigDownDash size={36} strokeWidth={1.25} />
        </Button>
      </a>
    </div>
  );
};

export default FindNothingText;
