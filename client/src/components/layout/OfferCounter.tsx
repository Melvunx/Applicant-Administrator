import { Offers } from "@/Pages/Home";
import NumberTicker from "../ui/number-ticker";
import Particles from "../ui/particles";

interface OfferCounterProps {
  offerList: Offers[];
  className: string;
}

const OfferCounter: React.FC<OfferCounterProps> = ({
  offerList,
  className,
}) => {
  return (
    <div className="relative mx-auto my-3 rounded-md bg-gray-200 p-3 text-center font-title shadow-md lg:w-3/4 lg-max:w-4/5">
      <Particles
        className="absolute left-0 top-0 size-full"
        quantity={100}
        staticity={50}
        ease={50}
        size={0.2}
        refresh
        color="#FF4B2B"
        vx={0}
        vy={0}
      />
      <h1 className="text-lg">
        Nombre d'offres :{" "}
        <NumberTicker
          value={offerList.length}
          className={className}
          delay={0.45}
        />
      </h1>
    </div>
  );
};

export default OfferCounter;
