import { ProductDetailClient } from '@/components/pages/product/product-detail-client';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductPageProps) => {
  return <ProductDetailClient id={params.id} />;
};

export default ProductDetailPage;
