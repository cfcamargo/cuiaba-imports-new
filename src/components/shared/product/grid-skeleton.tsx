import { Grid2 as Grid, Skeleton } from "@mui/material";

interface GridSkeletonProps {
  readonly perPage?: number;
}

export default function GridSkeleton({ perPage = 20 }: GridSkeletonProps) {
  return (
    <Grid container spacing={2}>
      {[...Array(perPage)].map((_, index) => (
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
