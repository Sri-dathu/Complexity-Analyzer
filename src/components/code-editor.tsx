import { Editor } from '@monaco-editor/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  onAnalyze?: () => void;
  isAnalyzing?: boolean;
  className?: string;
}


export function CodeEditor({ 
  value, 
  onChange, 
  language = 'python', 
  onAnalyze, 
  isAnalyzing = false, 
  className 
}: CodeEditorProps) {
  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  return (
    <Card className={cn("overflow-hidden border-editor-border", className)}>
      <div className="flex items-center justify-between p-4 border-b border-editor-border bg-gradient-accent">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Code Editor</span>
          <span className="text-xs text-muted-foreground">({language})</span>
        </div>
        <Button 
          onClick={onAnalyze}
          disabled={!value.trim() || isAnalyzing}
          size="sm"
          className="bg-gradient-primary shadow-elegant"
        >
          <Play className="h-3 w-3 mr-1" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>
      
      <div className="bg-editor-bg">
        <Editor
          height="400px"
          language={language}
          value={value}
          onChange={handleEditorChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            fontSize: 14,
            fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
            padding: { top: 16, bottom: 16 },
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
          }}
        />
      </div>
    </Card>
  );
}