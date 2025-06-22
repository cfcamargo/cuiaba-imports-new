import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function About() {
  return (
    <div className="w-full bg-white pt-16">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <Box paddingY={2}>
          <Grid
            container
            gap={4}
            size={12}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h4" className="text-zinc-950">
                Sobre a Cuiabá Imports
              </Typography>
              <div className="flex flex-col gap-4 text-zinc-950 py-10">
                <p>
                  Aqui, a tecnologia de ponta encontra qualidade e ótimo
                  atendimento. Somos especializados em Apple e Samsung, trazendo
                  até você os modelos mais desejados do mercado: iPhones, iPads,
                  MacBooks, Galaxies e muito mais.
                </p>
                <p>
                  Nosso compromisso é oferecer sempre os lançamentos mais
                  recentes, com produtos 100% originais e preços que valem a
                  pena. Tudo isso em um ambiente moderno, seguro e com
                  atendimento que faz a diferença.
                </p>
                <p>
                  Também contamos com uma assistência técnica especializada, com
                  profissionais qualificados que usam apenas peças originais
                  para cuidar do seu aparelho com o máximo de atenção.
                </p>
                <p>
                  Nossa equipe está pronta para te ajudar a escolher o produto
                  ideal, com um atendimento personalizado e atencioso. Mais do
                  que vender, queremos garantir uma experiência de compra
                  completa — da escolha à manutenção.
                </p>
                <p>
                  Se você busca tecnologia de verdade, confiança e um ótimo
                  atendimento, venha nos visitar. Será um prazer te receber!
                </p>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Image src="/about1.png" height={800} width={600} alt="" />
            </Grid>
          </Grid>
        </Box>
        <Box paddingY={6}>
          <Grid
            container
            gap={4}
            size={12}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
              <Image src="/about2.png" height={500} width={700} alt="" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Typography variant="h4" className="text-zinc-950">
                Missão
              </Typography>
              <div className="flex flex-col gap-4 text-zinc-950 py-10">
                <p>
                  Na Cuiabá Imports, nossa missão é ser a ponte entre os
                  produtos internacionais exclusivos e os nossos clientes.
                  Operando no Paraguai, temos orgulho em oferecer uma vasta
                  seleção de artigos importados, garantindo a autenticidade e a
                  qualidade em cada produto. Estamos dedicados a proporcionar
                  uma experiência de compra excepcional, com uma equipe de
                  atendimento ao cliente preparada para esclarecer todas as suas
                  dúvidas. Nosso objetivo é firmar a Cuiabá Imports como a
                  referência em lojas de importados, onde a confiança, a
                  diversidade de produtos e o compromisso com o cliente são
                  nossa principal marca
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
