import { useState } from 'react';

import Header from './components/Header';
import ContextInput from './components/ContextInput';
import GenerateButton from './components/GenerateButton';
import ResultsDisplay from './components/ResultsDisplay';
import { generateReplies } from './services/aiService';

function App() {
  const [context, setContext] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(null);

  const handleGenerate = async () => {
    if (!context.trim() && !imageFile) return;

    setIsGenerating(true);
    setResults(null);

    try {
      // If user provided an image but no text, simulate an OCR extraction
      let promptContext = context.trim();
      if (!promptContext && imageFile) {
        promptContext = "[image attached: simulating extracted text: 'Hey, what are you doing later?']";
      } else if (imageFile) {
        promptContext += " [image attached]";
      }

      const gResults = await generateReplies(promptContext);
      setResults(gResults);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container animate-fade-in">
      <Header />

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <ContextInput
          value={context}
          onChange={setContext}
          imageFile={imageFile}
          onImageChange={setImageFile}
        />
        <GenerateButton
          onClick={handleGenerate}
          isLoading={isGenerating}
          disabled={(!context.trim() && !imageFile) || isGenerating}
        />

        {results && <ResultsDisplay results={results} />}
      </main>

      <footer style={{
        marginTop: '3rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        opacity: 0.5,
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.1em'
      }}>
        AS
      </footer>
    </div>
  )
}

export default App;
