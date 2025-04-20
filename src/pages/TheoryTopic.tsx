
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";

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
  const { topicId, contentPath } = useParams();
  const navigate = useNavigate();
  const [structure, setStructure] = useState<Record<string, Category>>({});
  const [isLoadingStructure, setIsLoadingStructure] = useState(true);
  const [content, setContent] = useState<TheoryContentResponse | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await api.get("/theory/structure");
        setStructure(response.data);
      } catch (err) {
        console.error("Failed to fetch theory structure:", err);
        setError("Failed to load content structure. Please try again later.");
      } finally {
        setIsLoadingStructure(false);
      }
    };

    fetchStructure();
  }, []);

  useEffect(() => {
    if (contentPath) {
      const fetchContent = async () => {
        setIsLoadingContent(true);
        try {
          const response = await api.get(`/theory/content/${contentPath}`);
          setContent(response.data);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch theory content:", err);
          setError("Failed to load the requested content. It might not exist or there was a server error.");
        } finally {
          setIsLoadingContent(false);
        }
      };

      fetchContent();
    } else {
      setContent(null);
    }
  }, [contentPath]);

  const renderNav = (category: Category, currentPath: string = "", depth: number = 0) => {
    return (
      <div key={currentPath} className="space-y-1">
        {Object.entries(category.subcategories).map(([key, subCategory]) => (
          <div key={key} className="space-y-1">
            <div className={`pl-${depth * 2} font-medium text-sm text-muted-foreground`}>
              {key}
            </div>
            {renderNav(subCategory, `${currentPath}/${key}`.replace(/^\//, ''), depth + 1)}
          </div>
        ))}
        {category.files.map((file) => (
          <Link
            key={file.path}
            to={`/theory/${topicId}/${file.path.replace(/\.md$/, '')}`}
            className={`block pl-${depth * 2 + 2} py-1 text-sm rounded hover:bg-accent ${
              contentPath === file.path.replace(/\.md$/, '') ? "bg-accent/50 font-medium" : ""
            }`}
          >
            {file.name}
          </Link>
        ))}
      </div>
    );
  };

  // Find the current topic category
  const currentCategory = topicId && structure[topicId] ? structure[topicId] : null;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/theory")}
            className="mb-4"
          >
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
              <ScrollArea className="h-[calc(100vh-300px)]">
                {isLoadingStructure ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : currentCategory ? (
                  renderNav(currentCategory)
                ) : (
                  <p className="text-sm text-muted-foreground">No content available</p>
                )}
              </ScrollArea>
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
