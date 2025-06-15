import { Typography } from "@mui/material";
import { Instagram, Facebook, MessageCircle, PinIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="w-full max-w-[1200px] mx-auto flex justify-between">
        <nav className="flex flex-col gap-2">
          <Link href={"/"}>Home</Link>
          <Link href={"/shop"}>Loja</Link>
          <Link href={"/assistance"}>Assistência Técnica</Link>
          <Link href={"/about"}>Sobre</Link>
        </nav>

        <div className="flex gap-2 flex-col">
          <Typography>Entre em contato</Typography>
          <a
            href="https://www.instagram.com/cuiabaimportspy/"
            className="flex items-center gap-2"
          >
            <MessageCircle color="white" />
            <span className="text-white">Whatsapp</span>
          </a>

          <a
            href="https://www.instagram.com/cuiabaimportspy/"
            className="flex items-center gap-2"
          >
            <Instagram color="white" />
            <span className="text-white">Instagram</span>
          </a>

          <a
            href="https://www.instagram.com/cuiabaimportspy/"
            className="flex items-center gap-2"
          >
            <Facebook color="white" />
            <span className="text-white">Facebook</span>
          </a>

          <a
            href="https://goo.gl/maps/iGCUGsx5cNLuY2eh8"
            className="flex items-center gap-2"
          >
            <PinIcon color="white" />
            <span className="text-white">Localização</span>
          </a>
        </div>

        <div>
          <Typography variant="body1">Horários de funcionamento:</Typography>
          <div className="flex flex-col mt-4">
            <span>Seg a Sab: 08:00 as 18:00hs</span>
            <span>Dom: 08:00 as 12:00hs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
