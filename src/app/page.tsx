"use client";
import dynamic from "next/dynamic";

const Calculator = dynamic(
  () =>
    import("@/components/calculator/Calculator").then((mod) => mod.Calculator),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <Calculator />
    </div>
  );
}
