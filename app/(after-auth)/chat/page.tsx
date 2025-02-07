'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCohereResponse } from '@/utils/cohere';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { MessageSquare, ChevronDown } from 'lucide-react';

export default function Chat() {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; from: 'user' | 'cohere' }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { text: query, from: 'user' }]);
    setQuery('');
    setIsLoading(true);

    try {
      const cohereResponse = await getCohereResponse(query);
      setMessages((prev) => [...prev, { text: cohereResponse, from: 'cohere' }]);
    } catch (error) {
      console.error('Error fetching Cohere response:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Cohere: Sorry, there was an error processing your request.', from: 'cohere' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-[#5046e6] to-[#6b64ff] shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          AI Chat Assistant
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
          <h2 className="text-lg font-semibold text-[#5046e6]">How to Use This Chat Model</h2>
          <ChevronDown className={`w-5 h-5 text-[#5046e6] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>
        {isDropdownOpen && (
          <div className="mt-4 text-gray-700 space-y-3">
            <p>
              This chat interface allows you to interact with a language model. Here&apos;s how you can use it:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Type your question or query in the input box below.</li>
              <li>Click the <strong>Send</strong> button or press <strong>Enter</strong> to submit your query.</li>
              <li>The model will respond with an answer or relevant information.</li>
              <li>Ensure your queries are clear and concise for the best results.</li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              Please note: This model generates responses based on the input provided and may not always be 100% accurate. For critical tasks, verify the information independently.
            </p>
          </div>
        )}
      </div>

      <div className="flex-grow p-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-4 min-h-[69vh] max-h-[69vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 mb-3 rounded-xl ${
                message.from === 'user' 
                  ? 'bg-[#5046e6] text-white ml-auto max-w-[80%]' 
                  : 'bg-gray-100 text-gray-800 mr-auto max-w-[80%]'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#5046e6] border-t-transparent"></div>
            </div>
          )}
        </div>
        <form onSubmit={handleQuerySubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow rounded-xl border-[#5046e6]/20 focus:border-[#5046e6] focus:ring-[#5046e6] bg-white/70 backdrop-blur-sm"
          />
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="bg-[#5046e6] hover:bg-[#6b64ff] text-white rounded-xl px-6 transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
