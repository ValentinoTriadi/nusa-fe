const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="bg-background w-full max-w-md">{children}</div>
    </div>
  );
};

export default ProductLayout;
