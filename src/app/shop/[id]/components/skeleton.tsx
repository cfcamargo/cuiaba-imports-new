import { Skeleton } from "@mui/material";

export default function ProductDetailsSkeleton() {
  return (
    <div className="w-full max-w-[1200px] px-2 mx-auto flex flex-col gap-4">
      <div className="flex xs:flex-col md:flex-row gap-8 items-center">
        <Skeleton width={"50%"} height={700} />
        <div className="w-full">
          <div className="w-[400px]">
            <Skeleton height={100} />
          </div>
          <div className="w-[200px]">
            <Skeleton height={100} />
          </div>
          <div className="w-[100px]">
            <Skeleton height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
