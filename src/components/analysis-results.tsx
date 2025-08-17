import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MathDisplay } from './ui/math-display';
import { Clock, MemoryStick, Target, BookOpen, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  results: {
    timeComplexity: {
      bigO: string;
      bigTheta?: string;
      bigOmega?: string;
    };
    spaceComplexity: {
      auxiliary: string;
      stack?: string;
    };
    equations: Array<{
      label: string;
      latex: string;
    }>;
    derivation: Array<{
      step: string;
      explanation: string;
      latex?: string;
    }>;
    confidence: number;
    assumptions: string[];
    method: string[];
  };
  className?: string;
}

export function AnalysisResults({ results, className }: AnalysisResultsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'success';
    if (confidence >= 0.7) return 'warning';
    return 'destructive';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return 'High Confidence';
    if (confidence >= 0.7) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-gradient-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Time Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">
                <MathDisplay math={results.timeComplexity.bigO} />
              </div>
              {results.timeComplexity.bigTheta && (
                <div className="text-sm text-muted-foreground">
                  Tight bound: <MathDisplay math={results.timeComplexity.bigTheta} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MemoryStick className="h-4 w-4 text-primary" />
              Space Complexity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">
                <MathDisplay math={results.spaceComplexity.auxiliary} />
              </div>
              {results.spaceComplexity.stack && (
                <div className="text-sm text-muted-foreground">
                  Stack: <MathDisplay math={results.spaceComplexity.stack} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-accent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Analysis Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{Math.round(results.confidence * 100)}%</div>
                <Badge variant={getConfidenceColor(results.confidence) as any}>
                  {getConfidenceLabel(results.confidence)}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {results.method.map((method, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mathematical Derivation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Mathematical Derivation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.equations.map((eq, index) => (
            <MathDisplay
              key={index}
              math={eq.latex}
              display
              label={eq.label}
            />
          ))}
        </CardContent>
      </Card>

      {/* Step-by-Step Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Step-by-Step Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.derivation.map((step, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-4 space-y-2">
              <div className="font-medium text-sm">{step.step}</div>
              <div className="text-sm text-muted-foreground">{step.explanation}</div>
              {step.latex && (
                <MathDisplay math={step.latex} display />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {results.assumptions.map((assumption, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                {assumption}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}