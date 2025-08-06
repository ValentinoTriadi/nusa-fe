import { Heart, ShoppingBasket } from 'lucide-react';

const ProductPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold">Oops!</h1>
      <p className="mb-8 text-xl">Halaman ini tidak ada</p>
      <p className="mb-8 text-lg">Mungkin kamu ingin pergi ke:</p>
      <div className="flex w-full gap-4">
        <a
          href="/marketplace"
          className="bg-accent hover:bg-accent/80 flex w-full items-center justify-center rounded-lg px-6 py-3 text-white shadow-sm transition-colors"
        >
          <ShoppingBasket className="mr-2 inline-block" />
          Pasar
        </a>
        <a
          href="/favorites"
          className="text-accent flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 shadow-sm transition-colors hover:bg-gray-200/80"
        >
          <Heart className="mr-2 inline-block fill-current" />
          Favorit
        </a>
      </div>
    </div>
  );
};

export default ProductPage;
