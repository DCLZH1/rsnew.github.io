import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { DEFAULT_PRODUCTS } from '@/services/productService';

export default function Products() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const products = DEFAULT_PRODUCTS;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">产品展示</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg bg-white p-4 shadow-md">
              <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-auto w-full cursor-pointer object-cover"
                  onClick={() => setSelectedImage(product.image)}
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <ul className="mt-4 space-y-1 text-gray-500">
                {product.specs.map((spec: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90vh] max-w-[90vw] cursor-zoom-out object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
