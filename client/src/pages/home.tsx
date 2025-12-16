import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Play, Terminal, Code2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [input, setInput] = useState(JSON.stringify({
    skills: ["JavaScript", "HTML", "CSS", "Git"],
    targetRole: "Frontend Developer"
  }, null, 2));

  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateApi = async () => {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const parsedInput = JSON.parse(input);
      
      // Validation simulation
      if (!parsedInput.skills || !Array.isArray(parsedInput.skills) || !parsedInput.targetRole) {
        throw new Error("Invalid request body. 'skills' (array) and 'targetRole' (string) are required.");
      }

      // Logic simulation
      const requiredSkills = ["React", "TypeScript", "Tailwind"];
      const matched = parsedInput.skills.filter((s: string) => 
        requiredSkills.some(req => s.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(s.toLowerCase()))
      );
      
      const missing = requiredSkills.filter(req => 
        !parsedInput.skills.some((s: string) => s.toLowerCase().includes(req.toLowerCase()))
      );

      const score = Math.min(100, Math.round((parsedInput.skills.length / (requiredSkills.length + 3)) * 100) + (matched.length * 20));

      const response = {
        score,
        coreSkillsMatched: matched,
        missingSkills: missing,
        suggestions: missing.map(s => `Consider learning ${s} to improve your chances for ${parsedInput.targetRole}`)
      };

      setOutput(JSON.stringify(response, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Skill Matcher API</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A simulated REST API environment to analyze developer profiles against target roles.
            Test the endpoint logic directly in the browser.
          </p>
        </div>

        {/* Endpoint Info */}
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border/50 font-mono text-sm">
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">POST</Badge>
          <span className="text-muted-foreground">/api/v1/analyze</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          
          {/* Request Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full flex flex-col"
          >
            <Card className="h-full flex flex-col border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4 border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  Request Body (JSON)
                </CardTitle>
                <CardDescription>
                  Define the candidate's skills and desired role.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-full w-full resize-none rounded-none border-0 p-6 font-mono text-sm leading-relaxed focus-visible:ring-0 bg-transparent"
                  spellCheck={false}
                />
                <div className="absolute bottom-4 right-4">
                  <Button 
                    onClick={simulateApi} 
                    disabled={loading}
                    className="shadow-lg hover:shadow-xl transition-all active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Send Request</span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full flex flex-col"
          >
            <Card className="h-full flex flex-col border-border/60 shadow-sm bg-muted/10">
              <CardHeader className="pb-4 border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  Response Output
                </CardTitle>
                <CardDescription>
                  Real-time server simulation results.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-6 font-mono text-sm overflow-auto">
                {error ? (
                  <Alert variant="destructive" className="animate-in fade-in zoom-in-95">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : output ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Status: 200 OK</span>
                    </div>
                    <pre className="text-foreground/90 whitespace-pre-wrap">
                      {output}
                    </pre>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground/50 italic">
                    Waiting for request...
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
