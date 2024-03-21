import React, { useState, useEffect } from 'react';

function TextToImageGenerator() {
  const [textInput, setTextInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  useEffect(() => {
    async function generateImage() {
      if (textInput.trim() === '') return; // Don't send empty text

      try {
        const response = await fetch('https://api-inference.huggingface.co/models/openai/dall-e-2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_HUGGING_FACE_API_KEY', // Replace with your actual API key
          },
          body: JSON.stringify({ "inputs": textInput }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate image');
        }

        const data = await response.json();
        setGeneratedImage(data);
      } catch (error) {
        console.error('Error generating image:', error);
        setGeneratedImage(''); // Clear previously generated image on error
      }
    }

    generateImage();
  }, [textInput]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div>
      <textarea value={textInput} onChange={handleTextInputChange}  className="bg-slate-500"/>
      {generatedImage && <img src={generatedImage} alt="Generated" />}
    </div>
  );
}

export default TextToImageGenerator;
