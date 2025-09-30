import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '产品中心',
  description: '浏览我们的全系列BAT叉车配件产品，包括叉车配件、叉车零部件、工业配件等。快速找到您所需的高质量叉车配件。',
  keywords: ['产品中心', 'BAT叉车配件', '叉车配件目录', '叉车配件', '叉车零部件'],
  openGraph: {
    title: '产品中心 | BAT叉车配件销售',
    description: '浏览我们的全系列BAT叉车配件产品，包括叉车配件、叉车零部件、工业配件等。',
    type: 'website',
    url: 'https://parts.blueant.top/products',
  },
  alternates: {
    canonical: 'https://parts.blueant.top/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}