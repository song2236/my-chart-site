import dynamic from "next/dynamic";

const ChartGenerator = dynamic(() => import("../components/ChartGenerator"), { ssr: false });

export default function Home() {
  return <ChartGenerator />;
}
