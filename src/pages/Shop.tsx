import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, FileText, Package, Loader2 } from "lucide-react";
import ConsultationRequestForm from "@/components/shop/ConsultationRequestForm";
import { shopApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

// Sceglie l'icona in base alla categoria
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Consulenze": return Handshake;
    case "Prodotti Digitali": return FileText;
    case "Prodotti Fisici": return Package;
    default: return Package;
  }
};

const Shop = () => {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await shopApi.getProducts() as Record<string, any[]>;

        // Trasforma _id in id e aggiungi icona
        const productsWithIcons = Object.fromEntries(
          Object.entries(data).map(([category, prods]) => [
            category,
            prods.map((prod) => ({
              id: prod._id,
              ...prod,
              icon: getCategoryIcon(category),
            }))
          ])
        );

        setProductsByCategory(productsWithIcons);
      } catch (err) {
        console.error('Errore caricamento prodotti:', err);
        setError('Impossibile caricare i prodotti. Riprova più tardi.');
        toast({
          title: 'Errore',
          description: 'Impossibile caricare i prodotti. Riprova più tardi.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleBuyClick = (product: any, category: string) => {
    if (category === "Consulenze") {
      setSelectedProduct(product);
      setIsFormOpen(true);
    } else {
      toast({
        title: 'Acquisto',
        description: `Aggiunto al carrello: ${product.title}`,
      });
    }
  };

  // Costruiamo l'ordine delle categorie: prima "Consulenze", poi le altre
  const orderedCategories = React.useMemo(() => {
    const cats = Object.keys(productsByCategory);
    return [
      ...cats.filter(cat => cat === "Consulenze"),
      ...cats.filter(cat => cat !== "Consulenze")
    ];
  }, [productsByCategory]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Caricamento prodotti...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : orderedCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nessun prodotto disponibile al momento.</p>
          </div>
        ) : (
          orderedCategories.map((category) => {
            const categoryProducts = productsByCategory[category];
            return (
              <div key={category} className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  {React.createElement(getCategoryIcon(category), { className: "h-6 w-6" })}
                  <h2 className="text-2xl font-semibold">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Card
                      key={String(product.id)}
                      className="overflow-hidden flex flex-col"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{product.price}</p>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <Button
                          className="w-full"
                          onClick={() => handleBuyClick(product, category)}
                        >
                          {category === "Consulenze" ? "Richiedi Consulenza" : "Acquista Ora"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {isFormOpen && selectedProduct && (
        <ConsultationRequestForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          product={selectedProduct}
          consultationProducts={productsByCategory["Consulenze"] || []}
        />
      )}
    </MainLayout>
  );
};

export default Shop;
