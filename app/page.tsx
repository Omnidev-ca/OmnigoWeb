import { client } from "@/lib/sanity.client";
import { HomeClient } from "./components/home-client"
import { homePageQuery } from "@/lib/queries";

export default async function Home() {
  return <HomeClient />
}
