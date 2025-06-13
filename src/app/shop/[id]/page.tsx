"use client";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();

  return (
    <div className="w-full h-dvh bg-white">
      <span>{params.id}</span>;
    </div>
  );
}
