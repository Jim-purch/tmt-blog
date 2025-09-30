'use client';

import { Product } from "@/interfaces/product";
import { useCurrency, useFormatPrice } from "@/lib/useCurrency";

interface ProductStructuredDataProps {
  product: Product;
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const currency = useCurrency();
  const formatPrice = useFormatPrice();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": product.category,
    "sku": product.partNumber,
    "mpn": product.partNumber,
    "image": product.imageUrl,
    "url": `https://parts.blueant.top/products/${product.seo}`,
    "offers": {
      "@type": "Offer",
      "price": (Number(product.price) * currency.exchangeRate).toFixed(currency.decimalPlaces),
      "priceCurrency": currency.code,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "BAT Parts Sale"
      }
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.brand
    },
    "weight": {
      "@type": "QuantitativeValue",
      "value": product.weight,
      "unitCode": "KGM"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}