import { getOffers } from "@/api/offer";
import Error from "@/pages/ErrorPage";
import userAuthStore from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import OfferCard from "./OfferCard";

export default function Offers() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = userAuthStore();

  const {
    data: offers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: async () =>
      await getOffers({ navigate, accessToken, setAccessToken }),
  });
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <Error />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {offers && offers.length > 0 ? (
        offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
      ) : (
        <p className="text-warning">Aucunes offres n'a été trouvé</p>
      )}
    </div>
  );
}
