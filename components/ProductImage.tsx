"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import type { Product } from "@/lib/products";

/**
 * Shows the real product photo from `product.image` (a file under
 * /public/products/). If the photo is missing or fails to load, it
 * gracefully falls back to the flat packaging illustration — so the
 * showcase always looks complete, and real photos appear as soon as
 * they are dropped into /public/products/.
 */
export function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Images that 404 before React hydrates never fire onError, so also
  // check for an already-broken image once mounted.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !product.image) {
    return <Icon name={product.pack} className="h-12 w-12" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}
