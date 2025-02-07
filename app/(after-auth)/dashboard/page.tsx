'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Book, ImageIcon, MessageSquare, FileText, Wand2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-[#5046e6] to-[#6b64ff] shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Dynamic Catalog Builder
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

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Quick Actions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-[#5046e6]" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/catalog-editor" className="group">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all h-full">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                  <Book className="w-6 h-6 text-[#5046e6]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Create Catalog</h3>
                <p className="text-gray-600">Start building your professional catalog with our easy-to-use editor</p>
              </div>
            </Link>

            <Link href="/image" className="group">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all h-full">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                  <ImageIcon className="w-6 h-6 text-[#5046e6]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Generate Images</h3>
                <p className="text-gray-600">Create unique images for your catalog using AI technology</p>
              </div>
            </Link>

            <Link href="/chat" className="group">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all h-full">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#5046e6]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Assistant</h3>
                <p className="text-gray-600">Get help with content creation and design suggestions</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#5046e6]" />
            Features
          </h2>
          <div className="bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 items-start group">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#5046e6]/20 transition-colors">
                  <Wand2 className="w-6 h-6 text-[#5046e6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Tools</h3>
                  <p className="text-gray-600">Generate images and content with advanced AI technology</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#5046e6]/20 transition-colors">
                  <FileText className="w-6 h-6 text-[#5046e6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Export Options</h3>
                  <p className="text-gray-600">Export your catalogs in multiple formats (PDF, HTML)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#5046e6]/20 transition-colors">
                  <Book className="w-6 h-6 text-[#5046e6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Templates</h3>
                  <p className="text-gray-600">Choose from a variety of professional templates</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#5046e6]/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-[#5046e6]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Assistant</h3>
                  <p className="text-gray-600">Get intelligent suggestions and help with your content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
