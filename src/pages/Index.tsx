import { useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { AnalysisResults } from '@/components/analysis-results';
import { FileUpload } from '@/components/file-upload';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { analyzeComplexity } from '@/lib/complexity-analyzer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen } from 'lucide-react';

const Index = () => {
  const [code, setCode] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const results = await analyzeComplexity(code);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-accent shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Complexity Analyzer</h1>
                <p className="text-sm text-muted-foreground">Rigorous algorithmic complexity analysis with mathematical derivations</p>
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="bg-gradient-accent border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Algorithm Input
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter or upload any algorithm code. The analyzer intelligently detects patterns and 
                  derives mathematical complexity with detailed explanations.
                </p>
              </CardContent>
            </Card>

            <FileUpload 
              onCodeExtracted={setCode}
              className="mb-6" 
            />

            <CodeEditor
              value={code}
              onChange={setCode}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {analysisResults ? (
              <AnalysisResults results={analysisResults} />
            ) : (
              <Card className="h-[600px] flex items-center justify-center bg-gradient-math border-dashed border-2 border-primary/20">
                <div className="text-center space-y-4 max-w-md">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Ready for Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your Python code and click "Analyze" to see detailed complexity analysis 
                    with mathematical derivations, Big-O notation, and step-by-step explanations.
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>✓ Time & Space Complexity</div>
                    <div>✓ Mathematical Proofs</div>
                    <div>✓ Confidence Scoring</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
