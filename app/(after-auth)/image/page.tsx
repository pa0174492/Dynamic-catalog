'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateImage } from '@/utils/stabilityAI';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { ImageIcon, Download, ChevronDown, Wand2 } from 'lucide-react';

export default function ImageGeneration() {
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(''); // Reset the image

    try {
      const imageUrl = await generateImage(imagePrompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-image.png';
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-[#5046e6] to-[#6b64ff] shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          AI Image Generator
        </h1>
        <SignedIn>
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <p className="text-white/80">You are signed out. Please sign in to continue.</p>
        </SignedOut>
      </header>

      {/* Information Dropdown */}
      <div className="bg-white/50 backdrop-blur-sm border border-[#5046e6]/20 p-4 rounded-xl m-4 shadow-sm">
        <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <h2 className="text-lg font-semibold text-[#5046e6]">How to Use This Image Generator</h2>
          <ChevronDown className={`w-5 h-5 text-[#5046e6] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>
        {isDropdownOpen && (
          <div className="mt-4 text-gray-700 space-y-3">
            <p>
              This tool allows you to generate images based on a description. Here&apos;s how to use it:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Type a detailed description of the image you want to generate in the input box below.</li>
              <li>Click the <strong>Generate</strong> button to create the image.</li>
              <li>If satisfied with the result, click <strong>Download</strong> to save the image.</li>
              <li>Ensure the description is clear and specific for better results.</li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              Note: The quality and relevance of the image depend on the description provided.
            </p>
          </div>
        )}
      </div>

      <div className="flex-grow p-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-4 min-h-[69vh] max-h-[69vh] overflow-hidden flex justify-center items-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#5046e6] border-t-transparent"></div>
              <p className="text-[#5046e6] animate-pulse">Creating your masterpiece...</p>
            </div>
          ) : generatedImage ? (
            <div className="relative group">
              <Image 
                src={generatedImage} 
                alt="Generated" 
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg transition-transform group-hover:scale-[1.02]"
                width={512}
                height={512}
              />
              <Button
                onClick={handleDownloadImage}
                className="absolute bottom-4 right-4 bg-[#5046e6] hover:bg-[#6b64ff] text-white rounded-xl px-6 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-[#5046e6]/30" />
              <p className="text-lg">Your generated image will appear here</p>
              <p className="text-sm mt-2">Start by describing what you want to create</p>
            </div>
          )}
        </div>
        <form onSubmit={handleImageGeneration} className="flex gap-2">
          <Input
            type="text"
            placeholder="Describe the image you want to generate..."
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            className="flex-grow rounded-xl border-[#5046e6]/20 focus:border-[#5046e6] focus:ring-[#5046e6] bg-white/70 backdrop-blur-sm"
          />
          <Button 
            type="submit" 
            disabled={isGenerating} 
            className="bg-[#5046e6] hover:bg-[#6b64ff] text-white rounded-xl px-6 transition-colors flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </form>
      </div>
    </div>
  );
}
