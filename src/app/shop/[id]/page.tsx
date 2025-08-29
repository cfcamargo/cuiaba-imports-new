// "use client";

// import { Box, Typography } from "@mui/material";
// import { useParams } from "next/navigation";
// import ToggleVersions from "./components/toggle-version";
// import { useEffect, useState } from "react";
// import { MessageCircle } from "lucide-react";
// import { ProductProps } from "@/types/Product";
// import { productApi } from "@/lib/productApi";
// import VideoPlayer from "@/components/shared/videoPlayer/video-player";
// import ProductDetailsSkeleton from "./components/skeleton";

// export default function ProductDetails() {
//   const params = useParams();

//   const [selectedVersion, setSelectedVersion] = useState("");
//   const [invalidVariant, setInvalidVariant] = useState(false);
//   const [product, setProduct] = useState<ProductProps | null>(null);
//   const [loading, setLoading] = useState(true);

//   const openReserveLink = () => {
//     const message =
//       product?.variants[0] !== ""
//         ? `Olá! eu gostaria do Orçamento de um ${product?.title} na versão de ${selectedVersion}`
//         : `Olá! eu gostaria do Orçamento de um ${product?.title}.`;
//     const url = `https://api.whatsapp.com/send?phone=5567984513860&text=${message}`;

//     window.open(url, "_blank");
//   };

//   const handleGetProposal = () => {
//     if (product?.variants[0] !== "") {
//       if (selectedVersion !== "") {
//         setInvalidVariant(false);
//         openReserveLink();
//       } else {
//         setInvalidVariant(true);
//       }
//     } else {
//       openReserveLink();
//     }
//   };

//   const getProduct = async () => {
//     setLoading(true);
//     const response = await productApi.getProductById(Number(params.id));
//     setProduct(response.data);
//     console.log(response);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getProduct();
//   }, []);

//   return (
//     <div className="w-full bg-white py-10">
//       {loading && <ProductDetailsSkeleton />}
//       {!loading && (
//         <div className="w-full max-w-[1200px] px-2 mx-auto flex flex-col gap-4">
//           <Box className="flex xs:flex-col md:flex-row gap-8 items-center">
//             <div className="xs:w-full md:w-1/2 overflow-hidden">
//               <img src={product?.cover} className="objetc-cover" alt="" />
//             </div>
//             <div className="flex flex-col xs:items-center md:items-start gap-8">
//               <div className="w-full flex flex-col xs:items-center md:items-start">
//                 <Typography variant="h6" className="text-zinc-950">
//                   {product?.title}
//                 </Typography>
//                 <Typography variant="subtitle1" className="text-sky-600">
//                   {product?.sub}
//                 </Typography>
//               </div>

//               {product?.variants[0] !== "" && (
//                 <div className="flex flex-col xs:items-center md:items-start gap-2">
//                   <span className="text-zinc-950">Selecione a versão:</span>
//                   <ToggleVersions
//                     versions={product?.variants!}
//                     handleChangeVersion={(version) =>
//                       setSelectedVersion(version)
//                     }
//                   />
//                   {invalidVariant && (
//                     <span className="text-md text-red-600">
//                       Selecione uma versão
//                     </span>
//                   )}
//                 </div>
//               )}

//               <div className="w-full">
//                 <button
//                   onClick={handleGetProposal}
//                   className="xs:w-full md:w-[250px] bg-green-400 hover:bg-green-500 px-4 py-2 text-white rounded-lg flex justify-center items-center gap-2"
//                 >
//                   <MessageCircle color="white" />
//                   Solicitar orçamento
//                 </button>
//               </div>
//             </div>
//           </Box>

//           <Box>
//             <Typography variant="h6" className="text-zinc-950">
//               Descrição
//             </Typography>
//             <p className="text-zinc-900">{product?.description}</p>
//           </Box>

//           {product?.videoURL && (
//             <Box>
//               <VideoPlayer url={product.videoURL} />
//             </Box>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import ToggleVersions from "./components/toggle-version";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ProductProps } from "@/types/Product";
import { productApi } from "@/lib/productApi";
import VideoPlayer from "@/components/shared/videoPlayer/video-player";
import ProductDetailsSkeleton from "./components/skeleton";

export default function ProductDetails() {
  const params = useParams();

  const [selectedVersion, setSelectedVersion] = useState("");
  const [invalidVariant, setInvalidVariant] = useState(false);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  const hasVariants = useMemo(() => {
    const list = product?.variants ?? [];
    return Array.isArray(list) && list.some(v => (v ?? "").trim() !== "");
  }, [product]);

  const phone = "5567984513860";

  const openReserveLink = useCallback(() => {
    if (typeof window === "undefined" || !product) return;

    const baseText =
      hasVariants && selectedVersion
        ? `Olá! eu gostaria do Orçamento de um ${product.title} na versão de ${selectedVersion}`
        : `Olá! eu gostaria do Orçamento de um ${product.title}.`;

    // Dica: se quiser rastrear campanha, inclua algo no próprio texto (UTM não é lido pelo WhatsApp)
    const text = encodeURIComponent(baseText);

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;

    // ---- Métricas (GTM / GA4 / Pixel) ----
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "whatsapp_click",
      phone,
      product_id: product.id,
      product_title: product.title,
      variant: selectedVersion || null,
      source: "product_details_button",
    });

    // GA4 (opcional)
    if ((window as any).gtag) {
      (window as any).gtag("event", "whatsapp_click", {
        product_id: product.id,
        item_name: product.title,
        variant: selectedVersion || undefined,
      });
      // Google Ads Conversion (se tiver)
      // (window as any).gtag('event', 'conversion', { send_to: 'AW-XXXX/label' });
    }

    // Meta Pixel (opcional)
    if ((window as any).fbq) {
      (window as any).fbq("trackCustom", "WhatsAppClick", {
        product_id: product.id,
        variant: selectedVersion || undefined,
      });
    }

    // Abrir em nova aba (mantém a página viva pra tag disparar)
    window.open(url, "_blank", "noopener,noreferrer");
  }, [hasVariants, phone, product, selectedVersion]);

  const handleGetProposal = useCallback(() => {
    if (hasVariants) {
      if (selectedVersion) {
        setInvalidVariant(false);
        openReserveLink();
      } else {
        setInvalidVariant(true);
      }
    } else {
      openReserveLink();
    }
  }, [hasVariants, openReserveLink, selectedVersion]);

  const getProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productApi.getProductById(Number(params.id));
      setProduct(response.data);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="w-full bg-white py-10">
      {loading && <ProductDetailsSkeleton />}
      {!loading && product && (
        <div className="w-full max-w-[1200px] px-2 mx-auto flex flex-col gap-4">
          <Box className="flex xs:flex-col md:flex-row gap-8 items-center">
            <div className="xs:w-full md:w-1/2 overflow-hidden">
              <img src={product.cover} className="object-cover" alt={product.title} />
            </div>
            <div className="flex flex-col xs:items-center md:items-start gap-8">
              <div className="w-full flex flex-col xs:items-center md:items-start">
                <Typography variant="h6" className="text-zinc-950">
                  {product.title}
                </Typography>
                {product.sub && (
                  <Typography variant="subtitle1" className="text-sky-600">
                    {product.sub}
                  </Typography>
                )}
              </div>

              {hasVariants && (
                <div className="flex flex-col xs:items-center md:items-start gap-2">
                  <span className="text-zinc-950">Selecione a versão:</span>
                  <ToggleVersions
                    versions={product.variants}
                    handleChangeVersion={(version) => setSelectedVersion(version)}
                  />
                  {invalidVariant && (
                    <span className="text-md text-red-600">Selecione uma versão</span>
                  )}
                </div>
              )}

              <div className="w-full">
                <button
                  onClick={handleGetProposal}
                  // data-attrs úteis caso queira triggers por seletor no GTM
                  data-gtm="whatsapp_button"
                  id="whatsapp_button"
                  className="xs:w-full md:w-[250px] bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-lg flex justify-center items-center gap-2"
                >
                  <MessageCircle color="white" />
                  Solicitar orçamento
                </button>
              </div>
            </div>
          </Box>

          <Box>
            <Typography variant="h6" className="text-zinc-950">Descrição</Typography>
            <p className="text-zinc-900">{product.description}</p>
          </Box>

          {product.videoURL && (
            <Box>
              <VideoPlayer url={product.videoURL} />
            </Box>
          )}
        </div>
      )}
    </div>
  );
}

