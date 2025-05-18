import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";

// Tipizzazione globale per MathJax
declare global {
  interface Window {
    MathJax: any;
  }
}

interface ContentItem {
  name: string;
  path: string;
}

interface Category {
  subcategories: Record<string, Category>;
  files: ContentItem[];
}

interface TheoryContentResponse {
  title: string;
  content: string;
}

const TheoryTopic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [structure, setStructure] = useState<Record<string, Category>>({});
  const [isLoadingStructure, setIsLoadingStructure] = useState(true);
  const [content, setContent] = useState<TheoryContentResponse | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load MathJax config and script once on mount
  useEffect(() => {
    const configScript = document.createElement("script");
    configScript.type = "text/x-mathjax-config";
    configScript.text = `
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$','$'], ['\\\\(','\\\\)']],
          displayMath: [['$$','$$'], ['\\\\[','\\\\]']],
          processEscapes: true,
          processEnvironments: false
        },
        TeX: {
          Macros: {
            bm: ["\\\\boldsymbol{#1}", 1],
            argmin: "\\\\mathop{\\\\mathrm{argmin}}\\\\limits",
            argmax: "\\\\mathop{\\\\mathrm{argmax}}\\\\limits"
          }
        },
        "HTML-CSS": { 
          availableFonts: ["TeX"],
          webFont: "TeX"
        }
      });
    `;
    document.head.appendChild(configScript);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(script);
    };
  }, []);

  // Trigger MathJax render when content changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.Hub) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
  }, [content]);

  const getContentPath = () => {
    if (!topicId) return null;
    const baseRoute = `/theory/${topicId}/`;
    if (pathname.startsWith(baseRoute)) {
      return pathname.substring(baseRoute.length);
    }
    return null;
  };

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await api.get("/theory/structure");
        setStructure(response.data);
      } catch (err) {
        console.error("Failed to fetch theory structure:", err);
      } finally {
        setIsLoadingStructure(false);
      }
    };
    fetchStructure();
  }, []);

  useEffect(() => {
    const contentPath = getContentPath();
    if (topicId && contentPath) {
      const fetchContent = async () => {
        setIsLoadingContent(true);
        try {
          const apiPath = `${contentPath}`;
          const response = await api.get(`/theory/${topicId}/${apiPath}`);
          setContent(response.data);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch theory content:", err);
          setError("Failed to load the requested content. It might not exist or there was a server error.");
          setContent(null);
        } finally {
          setIsLoadingContent(false);
        }
      };
      fetchContent();
    } else {
      setContent(null);
    }
  }, [topicId, pathname]);

  const renderNav = (category: Category, depth = 0): JSX.Element => {
    const indent = depth * 16;
    return (
      <div>
        {Object.entries(category.subcategories).map(([key, subCategory]) => (
          <div key={key}>
            <div style={{ paddingLeft: indent }} className="font-medium text-sm text-muted-foreground">
              {key}
            </div>
            {renderNav(subCategory, depth + 1)}
          </div>
        ))}
        {category.files.map((file) => {
          const filePath = file.path.replace(/\.md$/, "");
          const linkPath = `/theory/${filePath}`;
          const isActive = location.pathname === linkPath;
          return (
            <Link
              key={file.path}
              to={linkPath}
              style={{ paddingLeft: indent + 16 }}
              className={`block py-1 text-sm rounded hover:bg-accent ${
                isActive ? "bg-accent/50 font-medium" : ""
              }`}
            >
              {file.name}
            </Link>
          );
        })}
      </div>
    );
  };

  const currentCategory = topicId && structure[topicId] ? structure[topicId] : null;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate("/theory")} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Theory
          </Button>
          <h1 className="text-3xl font-bold">
            {topicId === "intro"
              ? "Introduction to Machine Learning"
              : topicId === "supervised"
              ? "Supervised Learning"
              : topicId === "unsupervised"
              ? "Unsupervised Learning"
              : topicId === "deep-learning"
              ? "Deep Learning"
              : "Theory"}
          </h1>
          <Separator className="my-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Topics</h3>
              {isLoadingStructure ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : currentCategory ? (
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {renderNav(currentCategory)}
                </ScrollArea>
              ) : (
                <p className="text-sm text-muted-foreground">No content available</p>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardContent className="p-6">
              {isLoadingContent ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : error ? (
                <div className="p-4 border border-red-200 rounded bg-red-50 text-red-700">
                  {error}
                </div>
              ) : content ? (
                <article className="prose max-w-none">
                  <h1>{content.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content.content }} />
                </article>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Select a topic from the sidebar to view its content.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TheoryTopic;
