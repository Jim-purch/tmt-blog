import { Product } from "@/interfaces/product";

interface ProductStructuredDataProps {
  product: Product;
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
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
    "url": `https://parts.toomotoo.com/products/${product.seo}`,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "TMT Parts Sale"
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