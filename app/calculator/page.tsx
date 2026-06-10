import { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "What's Your Admin Time Really Costing You? | Reamo",
  description:
    "Real estate agents lose tens of thousands each year to post-call admin. Calculate your real opportunity cost in 30 seconds — free tool by Reamo.",
  openGraph: {
    title: "What's Your Admin Time Really Costing You?",
    description: "Calculate what post-call admin is actually costing you. Free tool by Reamo.",
    url: "https://reamo.ai/calculator",
    siteName: "Reamo",
    type: "website",
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
