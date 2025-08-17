// Enhanced complexity analysis with universal algorithm detection
interface ComplexityResult {
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
}

export function analyzeComplexity(code: string): Promise<ComplexityResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = performGeneralAnalysis(code);
      resolve(result);
    }, 1500);
  });
}

function performGeneralAnalysis(code: string): ComplexityResult {
  const cleanCode = code.toLowerCase().trim();
  
  if (!cleanCode) {
    return analyzeConstantTime(cleanCode);
  }

  // Detect patterns
  const recursion = detectRecursion(cleanCode);
  const loops = analyzeLoops(cleanCode);
  const sorting = detectSortingAlgorithms(cleanCode);
  const searching = detectSearchAlgorithms(cleanCode);

  if (recursion.detected) {
    return analyzeRecursiveComplexity(recursion, cleanCode);
  }
  
  if (sorting.detected) {
    return analyzeSortingComplexity(sorting);
  }
  
  if (searching.detected) {
    return analyzeSearchComplexity(searching);
  }
  
  if (loops.nestedLevel >= 2) {
    return analyzeNestedLoops();
  }
  
  if (loops.total >= 1) {
    return analyzeSingleLoop();
  }
  
  return analyzeConstantTime(cleanCode);
}

function detectRecursion(code: string) {
  const functions = (code.match(/def\s+(\w+)/g) || []).map(m => m.replace('def ', ''));
  const hasRecursion = functions.some(fn => code.split(fn + '(').length > 2);
  
  return {
    detected: hasRecursion,
    isDivideConquer: code.includes('//') || code.includes('/2') || code.includes('mid')
  };
}

function analyzeLoops(code: string) {
  const forLoops = (code.match(/for\s+/g) || []).length;
  const whileLoops = (code.match(/while\s+/g) || []).length;
  const nestedLevel = Math.max(1, forLoops + whileLoops > 1 ? 2 : forLoops + whileLoops);
  
  return { total: forLoops + whileLoops, nestedLevel };
}

function detectSortingAlgorithms(code: string) {
  return {
    detected: code.includes('sort') || code.includes('merge') || code.includes('quick')
  };
}

function detectSearchAlgorithms(code: string) {
  return {
    detected: code.includes('search') || code.includes('find'),
    binary: code.includes('mid') && code.includes('<')
  };
}

function analyzeRecursiveComplexity(recursion: any, code: string): ComplexityResult {
  if (recursion.isDivideConquer) {
    return {
      timeComplexity: { bigO: 'O(n \\log n)', bigTheta: '\\Theta(n \\log n)' },
      spaceComplexity: { auxiliary: 'O(n)', stack: 'O(\\log n)' },
      equations: [{ label: 'Recurrence', latex: 'T(n) = 2T(\\frac{n}{2}) + O(n)' }],
      derivation: [
        { step: 'Divide', explanation: 'Problem split in half', latex: '2T(\\frac{n}{2})' },
        { step: 'Combine', explanation: 'Linear merge step', latex: '+ O(n)' }
      ],
      confidence: 0.9,
      assumptions: ['Balanced recursion', 'Linear combine'],
      method: ['Master Theorem']
    };
  }
  
  return {
    timeComplexity: { bigO: 'O(2^n)' },
    spaceComplexity: { auxiliary: 'O(n)' },
    equations: [{ label: 'Exponential', latex: 'T(n) = 2^n' }],
    derivation: [{ step: 'Recursion', explanation: 'Exponential branching', latex: '2^n' }],
    confidence: 0.8,
    assumptions: ['No memoization'],
    method: ['Recursion Tree']
  };
}

function analyzeSortingComplexity(sorting: any): ComplexityResult {
  return {
    timeComplexity: { bigO: 'O(n \\log n)', bigTheta: '\\Theta(n \\log n)' },
    spaceComplexity: { auxiliary: 'O(n)' },
    equations: [{ label: 'Sorting', latex: 'T(n) = \\Theta(n \\log n)' }],
    derivation: [{ step: 'Comparison Sort', explanation: 'Optimal comparison-based sorting', latex: 'n \\log n' }],
    confidence: 0.85,
    assumptions: ['Comparison-based sorting'],
    method: ['Sorting Analysis']
  };
}

function analyzeSearchComplexity(searching: any): ComplexityResult {
  if (searching.binary) {
    return {
      timeComplexity: { bigO: 'O(\\log n)' },
      spaceComplexity: { auxiliary: 'O(1)' },
      equations: [{ label: 'Binary Search', latex: 'T(n) = T(\\frac{n}{2}) + O(1)' }],
      derivation: [{ step: 'Halving', explanation: 'Search space halved', latex: '\\log n' }],
      confidence: 0.95,
      assumptions: ['Sorted input'],
      method: ['Binary Search']
    };
  }
  
  return {
    timeComplexity: { bigO: 'O(n)' },
    spaceComplexity: { auxiliary: 'O(1)' },
    equations: [{ label: 'Linear Search', latex: 'T(n) = O(n)' }],
    derivation: [{ step: 'Sequential', explanation: 'Check each element', latex: 'n' }],
    confidence: 0.9,
    assumptions: ['Unsorted data'],
    method: ['Linear Search']
  };
}

function analyzeNestedLoops(): ComplexityResult {
  return {
    timeComplexity: { bigO: 'O(n^2)', bigTheta: '\\Theta(n^2)' },
    spaceComplexity: { auxiliary: 'O(1)' },
    equations: [{ label: 'Nested Loops', latex: 'n \\times n = n^2' }],
    derivation: [
      { step: 'Outer Loop', explanation: 'n iterations', latex: 'n' },
      { step: 'Inner Loop', explanation: 'n iterations each', latex: 'n \\times n = n^2' }
    ],
    confidence: 0.85,
    assumptions: ['Both loops run n times'],
    method: ['Loop Analysis']
  };
}

function analyzeSingleLoop(): ComplexityResult {
  return {
    timeComplexity: { bigO: 'O(n)', bigTheta: '\\Theta(n)' },
    spaceComplexity: { auxiliary: 'O(1)' },
    equations: [{ label: 'Single Loop', latex: '\\sum_{i=0}^{n-1} O(1) = O(n)' }],
    derivation: [{ step: 'Linear Scan', explanation: 'One pass through data', latex: 'n' }],
    confidence: 0.9,
    assumptions: ['Loop runs n times'],
    method: ['Linear Analysis']
  };
}

function analyzeConstantTime(code: string): ComplexityResult {
  return {
    timeComplexity: { bigO: 'O(1)', bigTheta: '\\Theta(1)' },
    spaceComplexity: { auxiliary: 'O(1)' },
    equations: [{ label: 'Constant', latex: 'T(n) = c' }],
    derivation: [{ step: 'Fixed Operations', explanation: 'No loops or recursion', latex: '1' }],
    confidence: 0.8,
    assumptions: ['Basic operations only'],
    method: ['Direct Analysis']
  };
}