import { Grid, Skeleton } from "@mui/material";

export default function GridSkeleton() {
  return (
    <Grid container spacing={2}>
      {[...Array(20)].map((_, index) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
          key={index}
          height={400}
          padding={0}
        >
          <Skeleton sx={{ padding: 0, height: "100%", width: "100%" }} />
        </Grid>
      ))}
    </Grid>
  );
}
