'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Home, MessageSquare, Image as ImageIcon, Book, Menu, Globe, Sparkles, Layout } from 'lucide-react';

interface SideBarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-[#5046e6] to-[#6b64ff] text-white transition-all duration-300 relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white/90" />
            <h1 className="text-lg font-bold text-white/90 leading-none">
              Dynamic Catalog Builder
            </h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-white/90" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <Home className="w-4 h-4" />
            </div>
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          
          <Link 
            href="/chat" 
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            {!isCollapsed && <span>Chat LLM</span>}
          </Link>
          
          <Link 
            href="/image" 
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>
            {!isCollapsed && <span>Image Generator</span>}
          </Link>
          
          <Link 
            href="/catalog-editor" 
            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all group"
          >
            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
              <Layout className="w-4 h-4" />
            </div>
            {!isCollapsed && <span>Catalog Editor</span>}
          </Link>
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Globe className="w-3 h-3" />
            <span>Version 1.0.0</span>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default SideBar;
