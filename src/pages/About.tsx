
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">About ML Learn</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            ML Learn is a modern platform designed to make machine learning education accessible, practical, and effective.
          </p>
        </div>

        <Tabs defaultValue="platform" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="platform">The Platform</TabsTrigger>
            <TabsTrigger value="tech">Technology</TabsTrigger>
            <TabsTrigger value="future">Roadmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform" className="mt-0 max-w-4xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  ML Learn aims to bridge the gap between theoretical machine learning concepts and practical implementation. 
                  We believe that the best way to learn is by doing, which is why our platform combines in-depth theory with hands-on coding exercises.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Learning Approach</h2>
                <p className="text-muted-foreground mb-4">
                  Our educational approach is based on three core principles:
                </p>
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Comprehensive Theory</span> - Detailed explanations of concepts with visual aids and examples
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Practical Implementation</span> - Coding exercises that reinforce theoretical understanding
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Real-world Applications</span> - Case studies and projects that demonstrate practical relevance
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Who It's For</h2>
                <p className="text-muted-foreground">
                  ML Learn is designed for students, professionals, and enthusiasts who want to develop practical machine learning skills. 
                  Whether you're a beginner looking to enter the field or an experienced practitioner wanting to brush up on specific topics, 
                  our structured content and practical exercises cater to all levels.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tech" className="mt-0 max-w-4xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">Tech Stack</h2>
                <p className="text-muted-foreground mb-4">
                  ML Learn is built with modern technologies to provide a responsive, secure, and scalable learning experience:
                </p>
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Frontend:</span> React with TypeScript, TailwindCSS for UI
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Backend:</span> FastAPI (Python) for server-side logic
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Database:</span> MongoDB for flexible data storage
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Infrastructure:</span> Containerized with Docker, orchestrated with Kubernetes
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Code Evaluation</h2>
                <p className="text-muted-foreground">
                  For the practice section, we use a secure sandboxed environment to execute submitted Python code. 
                  This environment runs user solutions against predefined test cases, ensuring safety while providing 
                  immediate feedback on code correctness and performance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Security & Performance</h2>
                <p className="text-muted-foreground">
                  We prioritize the security of user data and code submissions. Our infrastructure is designed 
                  with security best practices in mind, including regular security audits and updates. 
                  The platform is optimized for performance, with global distribution to ensure low latency 
                  regardless of user location.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="mt-0 max-w-4xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">Future Plans</h2>
                <p className="text-muted-foreground mb-4">
                  The current version of ML Learn is just the beginning. Here's what we're planning to add:
                </p>
                <ul className="space-y-4 pl-6 text-muted-foreground">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <span className="font-medium text-foreground">Interactive Data Visualization</span>
                    <p className="mt-1">Tools to create and modify visualizations in real-time, enhancing understanding of data patterns</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <span className="font-medium text-foreground">Collaborative Learning</span>
                    <p className="mt-1">Features for group projects, peer reviews, and community discussions</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <span className="font-medium text-foreground">Advanced Progress Tracking</span>
                    <p className="mt-1">Detailed analytics on learning progress, strengths, and areas for improvement</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <span className="font-medium text-foreground">Certification Programs</span>
                    <p className="mt-1">Structured courses with assessments and certificates upon completion</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <span className="font-medium text-foreground">Personalized Learning Paths</span>
                    <p className="mt-1">AI-driven recommendations tailored to individual learning goals and skill levels</p>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Contribute</h2>
                <p className="text-muted-foreground">
                  We believe in the power of community-driven education. If you're interested in contributing to ML Learn, 
                  whether through content creation, code improvements, or feature suggestions, we'd love to hear from you. 
                  Contact us to learn more about collaboration opportunities.
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
