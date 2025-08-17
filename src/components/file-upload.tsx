import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Upload, FileText, Image, Scan, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { processOCR } from '@/lib/ocr-processor';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onCodeExtracted: (code: string) => void;
  className?: string;
}

export function FileUpload({ onCodeExtracted, className }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const extractedText = await processOCR(file);
      
      clearInterval(progressInterval);
      setProgress(100);

      if (extractedText.trim()) {
        onCodeExtracted(extractedText);
        toast({
          title: "Code extracted successfully!",
          description: `Extracted ${extractedText.length} characters from ${file.name}`,
        });
      } else {
        toast({
          title: "No code found",
          description: "Could not extract readable code from the uploaded file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('OCR processing failed:', error);
      toast({
        title: "Processing failed",
        description: "Failed to extract text from the uploaded file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setUploadedFile(null);
      }, 2000);
    }
  }, [onCodeExtracted, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => 
      file.type.startsWith('image/') || 
      file.type === 'application/pdf' ||
      file.type.startsWith('text/')
    );
    
    if (imageFile) {
      handleFileUpload(imageFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image, PDF, or text file",
        variant: "destructive",
      });
    }
  }, [handleFileUpload, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <Card className={cn("border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Upload className="h-5 w-5 text-primary" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isProcessing && !uploadedFile ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="text-center py-8 space-y-4"
          >
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <Scan className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Upload Code Documents</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drop files here or click to browse. Supports images, PDFs, and text files.
              </p>
              <input
                type="file"
                accept="image/*,.pdf,.txt,.py,.js,.cpp,.java"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" asChild className="cursor-pointer">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Image className="h-3 w-3" />
                Images
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                PDFs
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Text Files
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {uploadedFile && (
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">{uploadedFile.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                {!isProcessing && (
                  <Button variant="ghost" size="sm" onClick={clearFile}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing with OCR...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}