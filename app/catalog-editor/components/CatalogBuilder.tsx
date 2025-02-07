'use client';

import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Save, Plus, Image as ImageIcon, Layout, Wand2, Home, Download, Sparkles } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface CatalogSection {
  id: string;
  type: 'header' | 'product' | 'grid' | 'featured';
  content: {
    title?: string;
    description?: string;
    image?: string;
    price?: string;
    layout?: 'single' | 'grid' | 'featured';
  };
}

export default function CatalogBuilder() {
  const [sections, setSections] = useState<CatalogSection[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const generateImage = async (prompt: string) => {
    try {
      const response = await axios.post('/api/generate-image', { prompt });
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

  const handlePromptSubmit = async () => {
    setLoading(true);
    try {
      // Generate a product image based on the prompt
      const imageUrl = await generateImage(prompt);
      
      // Create a new section with the generated content
      const newSection: CatalogSection = {
        id: `section-${Date.now()}`,
        type: 'product',
        content: {
          title: 'New Product',
          description: prompt,
          image: imageUrl,
          price: '$99.99',
          layout: 'single'
        }
      };

      setSections([...sections, newSection]);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const addSection = (type: CatalogSection['type']) => {
    const newSection: CatalogSection = {
      id: `section-${Date.now()}`,
      type,
      content: {
        title: type === 'header' ? 'Catalog Title' : 'New Product',
        description: type === 'header' ? 'Catalog Description' : 'Product Description',
        layout: type === 'grid' ? 'grid' : 'single'
      }
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<CatalogSection['content']>) => {
    setSections(sections.map(section => 
      section.id === id 
        ? { ...section, content: { ...section.content, ...updates } }
        : section
    ));
  };

  const handleImageUpload = async (sectionId: string, file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        updateSection(sectionId, { image: response.data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const catalogData = {
        id: `catalog-${Date.now()}`,
        sections,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: '1.0'
        }
      };

      const response = await axios.post('/api/catalog/save', catalogData);

      if (response.data.success) {
        setSaveStatus('saved');
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        console.error('Save failed:', response.data.error);
        setSaveStatus('error');
        alert('Failed to save catalog: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving catalog:', error);
      setSaveStatus('error');
      if (axios.isAxiosError(error)) {
        alert('Failed to save catalog: ' + (error.response?.data?.details || error.message));
      } else {
        alert('Failed to save catalog. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-[#5046e6] to-[#6b64ff] shadow-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold text-white">
              Catalog Editor
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            disabled={loading || saveStatus === 'saving'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              saveStatus === 'saving' 
                ? 'bg-white/20 cursor-not-allowed'
                : saveStatus === 'saved'
                ? 'bg-green-500 hover:bg-green-600'
                : saveStatus === 'error'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white/10 hover:bg-white/20'
            } text-white`}
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Save className="w-4 h-4" />
                Saved!
              </>
            ) : saveStatus === 'error' ? (
              <>
                <Save className="w-4 h-4" />
                Error Saving
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="flex gap-6 max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="w-72 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#5046e6]" />
                Add Sections
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => addSection('header')}
                  className="w-full flex items-center gap-2 p-3 hover:bg-[#5046e6]/5 rounded-lg transition-colors text-gray-700 hover:text-[#5046e6]"
                >
                  <Layout className="w-4 h-4" />
                  Add Header
                </button>
                <button
                  onClick={() => addSection('product')}
                  className="w-full flex items-center gap-2 p-3 hover:bg-[#5046e6]/5 rounded-lg transition-colors text-gray-700 hover:text-[#5046e6]"
                >
                  <ImageIcon className="w-4 h-4" />
                  Add Product
                </button>
                <button
                  onClick={() => addSection('grid')}
                  className="w-full flex items-center gap-2 p-3 hover:bg-[#5046e6]/5 rounded-lg transition-colors text-gray-700 hover:text-[#5046e6]"
                >
                  <Layout className="w-4 h-4" />
                  Add Grid
                </button>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#5046e6]" />
                AI Generation
              </h2>
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your product..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#5046e6] focus:ring-1 focus:ring-[#5046e6] bg-white/50"
                  rows={4}
                />
                <button
                  onClick={handlePromptSubmit}
                  disabled={loading || !prompt}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-[#5046e6] text-white rounded-lg hover:bg-[#6b64ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Generate Section
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20 min-h-[calc(100vh-8rem)]">
            {sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Plus className="w-12 h-12 mb-4" />
                <p className="text-lg">Add sections or use AI to generate content</p>
                <p className="text-sm mt-2">Click the buttons on the left to get started</p>
              </div>
            ) : (
              <div className="space-y-8">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-6 border rounded-xl transition-all ${
                      selectedSection === section.id 
                        ? 'ring-2 ring-[#5046e6] border-transparent' 
                        : 'border-gray-200 hover:border-[#5046e6]/20'
                    }`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    {section.type === 'header' && (
                      <div className="text-center">
                        <input
                          type="text"
                          value={section.content.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="text-3xl font-bold text-center w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-4 py-2"
                          placeholder="Enter Title"
                        />
                        <textarea
                          value={section.content.description}
                          onChange={(e) => updateSection(section.id, { description: e.target.value })}
                          className="mt-4 text-gray-600 text-center w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-4 py-2 resize-none"
                          placeholder="Enter Description"
                        />
                      </div>
                    )}

                    {section.type === 'product' && (
                      <div className="flex gap-8">
                        <div className="w-1/2">
                          <label className="cursor-pointer block group relative">
                            {section.content.image ? (
                              <div className="relative group">
                                <img
                                  src={section.content.image}
                                  alt={section.content.title}
                                  className="w-full h-64 object-cover rounded-lg shadow-md group-hover:opacity-90 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                                    Click to change image
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload image</span>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(section.id, file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <div className="w-1/2 space-y-4">
                          <input
                            type="text"
                            value={section.content.title}
                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                            className="text-2xl font-bold w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-4 py-2"
                            placeholder="Product Title"
                          />
                          <textarea
                            value={section.content.description}
                            onChange={(e) => updateSection(section.id, { description: e.target.value })}
                            className="w-full h-32 border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-4 py-2 resize-none"
                            placeholder="Product Description"
                          />
                          <input
                            type="text"
                            value={section.content.price}
                            onChange={(e) => updateSection(section.id, { price: e.target.value })}
                            className="text-xl font-bold text-[#5046e6] w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-4 py-2"
                            placeholder="Price"
                          />
                        </div>
                      </div>
                    )}

                    {section.type === 'grid' && (
                      <div className="grid grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((index) => (
                          <div key={index} className="border border-gray-200 p-4 rounded-lg hover:border-[#5046e6]/20 transition-colors">
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder="Product Title"
                              className="text-lg font-semibold w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-3 py-1.5"
                            />
                            <input
                              type="text"
                              placeholder="$0.00"
                              className="text-sm text-[#5046e6] w-full border-none focus:outline-none focus:ring-1 focus:ring-[#5046e6] rounded-lg px-3 py-1.5 mt-2"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 