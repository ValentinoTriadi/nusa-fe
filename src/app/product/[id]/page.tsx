import { ProductDetailClient } from '@/components/pages/product/product-detail-client';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
};

export default ProductDetailPage;
