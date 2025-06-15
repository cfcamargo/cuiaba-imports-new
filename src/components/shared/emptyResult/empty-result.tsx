import { Box, Typography } from "@mui/material";
import { PackageOpen } from "lucide-react";

export default function EmptyResult() {
  return (
    <Box className="flex justify-center items-center gap-4 py-20">
      <PackageOpen color="black" size={30} />
      <Typography variant="h6" color="textPrimary">
        Nenhum resultado encontrado
      </Typography>
    </Box>
  );
}
