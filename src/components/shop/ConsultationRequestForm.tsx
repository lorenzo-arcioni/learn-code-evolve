import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authApi } from "@/services/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { shopApi } from "@/services/api";

interface ConsultationProduct {
  id: number;
  title: string;
  description: string;
  price: string;
}

interface ConsultationRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  product: ConsultationProduct;
  consultationProducts: ConsultationProduct[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  consultationType: string;
  description: string;
}

const ConsultationRequestForm: React.FC<ConsultationRequestFormProps> = ({
  isOpen,
  onClose,
  product,
  consultationProducts
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    full_name?: string;
    email?: string;
  } | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();

  // Check if user is logged in and get their data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("ml_academy_token");
        if (token) {
          setIsLoading(true);
          const user = await authApi.getCurrentUser();
          setIsLoggedIn(true);
          setUserData(user);
          
          // Pre-fill form with user data
          if (user.full_name) {
            const nameParts = user.full_name.split(" ");
            setValue("firstName", nameParts[0] || "");
            setValue("lastName", nameParts.slice(1).join(" ") || "");
          }
          if (user.email) {
            setValue("email", user.email);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      checkAuth();
      // Set consultation type from selected product
      if (product) {
        setValue("consultationType", product.title);
      }
    }
  }, [isOpen, product, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Chiama il backend per salvare la nuova richiesta
      await shopApi.submitConsultationRequest({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        consultationType: data.consultationType,
        description: data.description,
      });
  
      toast.success("La tua richiesta di consulenza è stata inviata con successo!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      toast.error("Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Richiesta di Consulenza</DialogTitle>
          <DialogDescription>
            Compila il modulo sottostante per richiedere una consulenza personalizzata.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Spinner className="h-8 w-8" />
            <span className="ml-2">Caricamento dati...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: "Il nome è obbligatorio" })}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome</Label>
                <Input
                  id="lastName"
                  {...register("lastName", { required: "Il cognome è obbligatorio" })}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "L'email è obbligatoria",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato email non valido"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultationType">Tipo di Consulenza</Label>
              <Input
                id="consultationTypeDisplay"
                value={`${product.title} - ${product.price}`}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
              <input
                type="hidden"
                {...register("consultationType")}
                value={product.title}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrizione della Richiesta</Label>
              <Textarea
                id="description"
                placeholder="Descrivi dettagliatamente la tua richiesta di consulenza..."
                className="min-h-[120px]"
                {...register("description", { 
                  required: "La descrizione è obbligatoria",
                  minLength: {
                    value: 50,
                    message: "La descrizione deve contenere almeno 50 caratteri"
                  }
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Annulla
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Invio in corso...
                  </>
                ) : (
                  "Invia Richiesta"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationRequestForm;