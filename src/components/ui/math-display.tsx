import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Card } from './card';
import { cn } from '@/lib/utils';

interface MathDisplayProps {
  math: string;
  display?: boolean;
  className?: string;
  label?: string;
}

export function MathDisplay({ math, display = false, className, label }: MathDisplayProps) {
  if (display) {
    return (
      <Card className={cn("p-4 bg-gradient-math border-math-border shadow-math", className)}>
        {label && (
          <div className="text-sm font-medium text-muted-foreground mb-2">{label}</div>
        )}
        <BlockMath math={math} />
      </Card>
    );
  }

  return <InlineMath math={math} className={className} />;
}