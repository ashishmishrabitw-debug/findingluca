import type { Metadata } from "next";
import Flatline from "@/components/heart/Flatline";

export const metadata: Metadata = {
  title: "Flatlined | WHPC",
};

export default function NotFound() {
  return <Flatline />;
}
