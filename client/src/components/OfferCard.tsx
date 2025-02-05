import { Offer } from "@/schema/offer.schema";

type OfferProps = {
  offer: Offer;
};

export default function OfferCard({ offer }: OfferProps) {
  return (
    <div className="card card-lg bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{offer.title ?? offer.type}</h2>
        <p>{offer.company}</p>
      </div>
    </div>
  );
}
