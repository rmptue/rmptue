import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/projects";

const BASE_URL = "https://rmptue.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/skills", "/about"];
  const projectRoutes = getAllSlugs().map((slug) => `/projects/${slug}`);
  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));
}
