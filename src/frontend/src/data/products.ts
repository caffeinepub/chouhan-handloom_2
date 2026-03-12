export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  image: string;
  colors: string[];
  badge?: string;
}

export const categories = [
  { label: "All", slug: "all" },
  { label: "Pure Maheshwari", slug: "maheshwari" },
  { label: "Silk", slug: "silk" },
  { label: "Cotton", slug: "cotton" },
  { label: "Bridal", slug: "bridal" },
  { label: "Festive Special", slug: "festive" },
];

export const products: Product[] = [];
