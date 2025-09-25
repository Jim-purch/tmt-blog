import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '产品中心',
  description: '浏览我们的全系列TMT配件产品，包括汽车配件、机械配件、工业配件等。快速找到您所需的高质量配件。',
  keywords: ['产品中心', 'TMT配件', '配件目录', '汽车配件', '机械配件'],
  openGraph: {
    title: '产品中心 | TMT Parts Sale',
    description: '浏览我们的全系列TMT配件产品，包括汽车配件、机械配件、工业配件等。',
    type: 'website',
    url: 'https://your-domain.com/products',
  },
  alternates: {
    canonical: 'https://your-domain.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}