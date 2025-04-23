import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, FileText, Package } from "lucide-react";
import ConsultationRequestForm from "@/components/shop/ConsultationRequestForm";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define product types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  icon: React.ElementType;
}

// Mock data - in a real app this would come from the API
const productsByCategory = {
  "Consulenze": [
    {
      id: 1,
      title: "Consulenza Personalizzata",
      description: "Sessione di consulenza one-to-one con un esperto di Machine Learning",
      price: "€150/ora",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      icon: Handshake
    },
    {
      id: 2,
      title: "Review del Codice",
      description: "Revisione dettagliata del tuo codice ML da parte di professionisti",
      price: "€80/progetto",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      icon: Handshake
    }
  ],
  "Prodotti Digitali": [
    {
      id: 3,
      title: "Dataset Premium",
      description: "Accesso a dataset curati e preprocessati per i tuoi progetti",
      price: "€50/mese",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      icon: FileText
    },
    {
      id: 4,
      title: "Esercizi Guidati ML",
      description: "Raccolta di esercizi pratici con soluzioni commentate",
      price: "€35",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      icon: FileText
    }
  ],
  "Prodotti Fisici": [
    {
      id: 5,
      title: "Libro: ML da Zero",
      description: "Manuale completo per iniziare con il Machine Learning",
      price: "€45",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
      icon: Package
    }
  ]
};

const Shop = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // In a real app, this would fetch products from an API
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return productsByCategory;
    },
    initialData: productsByCategory,
  });

  const handleBuyClick = (product: Product, category: string) => {
    if (category === "Consulenze") {
      setSelectedProduct(product);
      setIsFormOpen(true);
    } else {
      // For non-consultation products, we'd handle differently
      toast.info(`Aggiunto al carrello: ${product.title}`);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>
        {Object.entries(products).map(([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              {category === "Consulenze" && <Handshake className="h-6 w-6" />}
              {category === "Prodotti Digitali" && <FileText className="h-6 w-6" />}
              {category === "Prodotti Fisici" && <Package className="h-6 w-6" />}
              <h2 className="text-2xl font-semibold">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
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
        ))}
      </div>

      {/* Consultation Request Form */}
      <ConsultationRequestForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct as any}
        consultationProducts={products["Consulenze"]}
      />
    </MainLayout>
  );
};

export default Shop;