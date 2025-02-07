import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Meteors from '@/components/ui/meteors';
import BoxReveal from '@/components/ui/box-reveal';
import { Book, Wand2, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white max-h-[100vh] overflow-hidden relative">
      <Meteors number={20} />
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center size-full max-w-4xl px-4 z-10">
        {/* Hero Section */}
        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm text-[#5046e6] px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Catalog Creation</span>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <h1 className="text-4xl font-bold -tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#5046e6] to-[#6b64ff] text-center md:text-7xl md:leading-[5rem] mb-4">
            Dynamic Catalog Builder
          </h1>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <p className="text-xl text-gray-600 text-center max-w-2xl mb-8">
            Create professional catalogs with AI-powered tools, beautiful templates, and modern design features
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"#5046e6"} duration={1}>
          <Link href="/login">
            <Button className="bg-[#5046e6] hover:bg-[#6b64ff] text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </Button>
          </Link>
        </BoxReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
          <BoxReveal boxColor={"#5046e6"} duration={1.2}>
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all group">
              <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                <Book className="w-6 h-6 text-[#5046e6]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Templates</h3>
              <p className="text-gray-600">Choose from a variety of modern, customizable catalog templates</p>
            </div>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.4}>
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all group">
              <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                <Wand2 className="w-6 h-6 text-[#5046e6]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Tools</h3>
              <p className="text-gray-600">Generate content and designs with advanced AI technology</p>
            </div>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={1.6}>
            <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-[#5046e6]/20 transition-all group">
              <div className="bg-[#5046e6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5046e6]/20 transition-colors">
                <ImageIcon className="w-6 h-6 text-[#5046e6]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Image Generation</h3>
              <p className="text-gray-600">Create unique images for your catalog using AI</p>
            </div>
          </BoxReveal>
        </div>

        {/* Built with section */}
        <BoxReveal boxColor={"#5046e6"} duration={1.8}>
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-2">Built with modern technologies</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-[#5046e6] font-semibold">React</span>
              <span className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-[#5046e6] font-semibold">Next.js</span>
              <span className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-[#5046e6] font-semibold">TypeScript</span>
              <span className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-lg text-[#5046e6] font-semibold">Tailwind CSS</span>
            </div>
          </div>
        </BoxReveal>
      </div>
    </div>
  );
}
