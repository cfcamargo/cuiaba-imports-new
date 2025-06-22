import { Grid, Typography } from "@mui/material";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Assistance() {
  return (
    <div className="w-full bg-white">
      <div className="w-full h-[400px] bg-[url('/assistance-banner.jpg')] bg-center">
        <div className="w-full h-full bg-black/70">
          <div className="w-full h-full max-w-[1200px] mx-auto flex items-center px-4">
            <div className="max-w-[600px]">
              <Typography color="white" variant="h4">
                Assistência técnica especializada
              </Typography>
              <p className="mt-8">
                Possuimos uma assistência técnica especializada em celulares,
                tablets e notebooks. Nossa equipe altamente qualificada oferece
                soluções rápidas e confiáveis para os seus dispositivos.
                Priorizamos a satisfação do cliente, garantindo excelência e
                transparência em cada atendimento. Conte com a nossa expertise
                para superar seus problemas técnicos. Entre em contato hoje
                mesmo.
              </p>
              <a
                href="http://bit.ly/3IMA32v"
                className="mt-4 flex items-center bg-green-500 gap-2 py-2 justify-center w-[250px] rounded-lg"
              >
                <MessageCircle />
                <span>Solicitar orçamento</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto py-10 flex flex-col gap-8 px-4">
        <Grid
          container
          justifyContent={"space-between"}
          gap={2}
          alignItems={"center"}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Image src="/assistence.jpg" width={600} height={500} alt="" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <p className="xs:text-center md:text-end text-zinc-950">
              Sabemos que seus celulares, tablets e notebooks são mais do que
              aparelhos, são seus parceiros do dia a dia. Então, quando eles
              começam a dar sinais de cansaço, quem vai ao resgate? Nós! Com uma
              equipe altamente qualificada, nós transformamos esses pequenos
              contratempos tecnológicos em meros obstáculos, facilmente
              superados. Aqui, a satisfação do cliente, a excelência e a
              transparência não são apenas palavras de ordem, são o nosso jeito
              de ser! Então, o que está esperando? Vamos colocar esses
              dispositivos de volta na pista. Entre em contato conosco hoje
              mesmo e experimente nossos serviços!"
            </p>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent={"space-between"}
          gap={2}
          alignItems={"center"}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <p className="xs:text-center md:text-start text-zinc-950">
              Você é um fã de produtos Apple? Ótimo, nós também somos! Nossa
              assistência técnica é especializada em celulares, tablets e
              notebooks da Maçã. Sabemos que cada iPhone, iPad e MacBook têm
              suas peculiaridades e merecem um cuidado especial. Nossa equipe,
              não só altamente qualificada, mas também entusiasta da Apple, está
              pronta para trazer seu dispositivo de volta à vida com precisão e
              uma pitada de diversão. Afinal, acreditamos que o serviço técnico
              não precisa ser uma dor de cabeça. Deixe-nos transformar esse
              percalço em uma experiência positiva. Pronto para trazer seu Apple
              de volta à ação? Entre em contato conosco hoje mesmo e sinta a
              diferença de um serviço feito por quem entende e ama o que faz!
            </p>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Image src="/assistence.jpg" width={600} height={500} alt="" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
