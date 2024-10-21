import { Typography } from "@material-tailwind/react";
import { BriefcaseBusiness, FileUser, MailQuestion } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mx-x w-full bg-blue-gray-900" id="footer">
      <ul className="flex items-center justify-evenly p-6">
        <Typography
          as="a"
          href="https://mail.google.com/mail/u/2/#inbox"
          color="white"
          className="flex items-center gap-2 font-normal transition-colors hover:text-red-400 focus:text-blue-500 "
        >
          Gmail <MailQuestion size={20} strokeWidth={1.25} />
        </Typography>
        <Typography
          as="a"
          href="https://www.canva.com/design/DAFmfBAwbRg/4os4Nxp0C0CdtO2UnE4PoQ/edit"
          color="white"
          className="flex items-center gap-2 font-normal transition-colors hover:text-purple-300 focus:text-blue-500 sm:text-sm"
        >
          Canva <FileUser size={20} strokeWidth={1.25} />
        </Typography>
        <Typography
          as="a"
          href="https://www.francetravail.fr/accueil/?xtor=SEC-1&gad_source=1&gclid=CjwKCAjwxNW2BhAkEiwA24Cm9P8kEeGw2l-ssZBkx7Ynt6jMh4WrYnf_GHMTU1-2kqnMzmcTOCHQ9RoCZpcQAvD_BwE"
          color="white"
          className="flex items-center gap-2 font-normal transition-colors hover:text-blue-500 focus:text-blue-500 sm:text-sm"
        >
          France Travail <BriefcaseBusiness size={20} strokeWidth={1.25} />
        </Typography>
      </ul>
    </footer>
  );
};

export default Footer;
