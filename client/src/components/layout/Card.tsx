interface Offers {
  title: string;
  company: string;
  status: string;
}

const Card = ({ offer }: { offer: Offers }) => {
  return (
    <div>
      <h1>{offer.title}</h1>
      <p>
        {offer.company} - {offer.status}
      </p>
    </div>
  );
};

export default Card;
