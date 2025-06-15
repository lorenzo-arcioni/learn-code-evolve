import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Informazioni su ML Learn</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            ML Learn è una piattaforma moderna progettata per rendere l'educazione al machine learning accessibile, pratica ed efficace.
          </p>
        </div>

        <Tabs defaultValue="piattaforma" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="piattaforma">La Piattaforma</TabsTrigger>
            <TabsTrigger value="founder">Founder</TabsTrigger>
          </TabsList>
          
          <TabsContent value="piattaforma" className="mt-0 max-w-4xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">La nostra missione</h2>
                <p className="text-muted-foreground">
                  ML Learn si propone di colmare il divario tra i concetti teorici del machine learning e la loro implementazione pratica. 
                  Crediamo che il modo migliore per imparare sia facendo, per questo la nostra piattaforma combina teoria approfondita con esercizi di coding pratici.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Approccio didattico</h2>
                <p className="text-muted-foreground mb-4">
                  Il nostro metodo educativo si basa su tre principi fondamentali:
                </p>
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Teoria Completa</span> - Spiegazioni dettagliate dei concetti con supporti visivi ed esempi pratici
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Implementazione Pratica</span> - Esercizi di programmazione per rafforzare la comprensione teorica
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Applicazioni Realistiche</span> - Case study e progetti che dimostrano la rilevanza pratica
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">A chi è rivolto</h2>
                <p className="text-muted-foreground">
                  ML Learn è pensato per studenti, professionisti ed appassionati che desiderano sviluppare competenze pratiche nel machine learning. 
                  Che tu sia un principiante o un esperto che vuole approfondire argomenti specifici, i nostri contenuti strutturati e gli esercizi pratici sono adatti a tutti i livelli.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Vantaggi della piattaforma</h2>
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                  <li>Accesso 24/7 ai materiali didattici aggiornati</li>
                  <li>Community attiva per supporto e networking</li>
                  <li>Feedback immediato sugli esercizi di coding</li>
                  <li>Integrazione con librerie ML open source popolari</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="founder" className="mt-0 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
              <div className="flex-shrink-0">
                <img
                  src="https://lorenzo-arcioni.github.io/images/profile.jpg"
                  alt="Foto di Lorenzo Arcioni"
                  className="w-48 h-48 rounded-full border-4 border-primary object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-center md:text-left">Lorenzo Arcioni</h2>
                <p className="text-muted-foreground mb-4">
                  Lorenzo Arcioni è un ingegnere del software e appassionato di machine learning con una forte esperienza nello sviluppo di soluzioni tecnologiche avanzate.
                  Con un background in ingegneria informatica e anni di esperienza nel settore, ha fondato ML Learn con l'obiettivo di rendere l'apprendimento del machine learning più accessibile e concreto.
                </p>
                <p className="text-muted-foreground mb-4">
                  Sul suo sito personale (<a href="https://lorenzo-arcioni.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary underline">lorenzo-arcioni.github.io</a>) puoi scoprire di più sui suoi progetti, competenze e contributi open source.
                </p>
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground text-left">
                  <li>Esperto in Python, machine learning e sviluppo web full-stack</li>
                  <li>Contributore attivo a progetti open source</li>
                  <li>Appassionato di tecnologie emergenti e didattica innovativa</li>
                  <li>Speaker in conferenze tech e workshop</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Lorenzo crede fermamente nella combinazione tra teoria e pratica e guida ML Learn per offrire un'esperienza didattica di alto livello.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default About;
