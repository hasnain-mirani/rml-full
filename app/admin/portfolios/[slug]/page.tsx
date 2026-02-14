import { fetchPortfolioBySlug } from "@/lib/fetchPortfolio";
import EditPortfolioClient from "./EditPortfolioClient";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export default async function EditPortfolioPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await params;

  const item = await fetchPortfolioBySlug(slug);

  if (!item) {
    return <div className="p-10 text-zinc-600">Portfolio item not found</div>;
  }

  return <EditPortfolioClient initial={item as any} />;
}
