'use client';

import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Save } from 'lucide-react';

export default function CatalogEditor() {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current) {
      console.log('Content:', content);
      // TODO: Implement save functionality
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Catalog Editor</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <Editor
            apiKey="j9zk7fmkrgxvlo6ofsjc660otypgw3jlvzx4i1peozxx7mpn"
            onInit={(evt, editor) => {
              editorRef.current = editor;
            }}
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
            init={{
              height: 800,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                'template', 'paste'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image media template | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              branding: false,
              promotion: false,
              paste_data_images: true,
              image_advtab: true,
              templates: [
                {
                  title: 'Product Grid',
                  description: '2x2 Product Grid',
                  content: `
                    <div class="grid grid-cols-2 gap-4 p-4">
                      <div class="border p-4">
                        <img src="placeholder.jpg" alt="Product 1">
                        <h3>Product Title</h3>
                        <p>Product Description</p>
                      </div>
                      <div class="border p-4">
                        <img src="placeholder.jpg" alt="Product 2">
                        <h3>Product Title</h3>
                        <p>Product Description</p>
                      </div>
                      <div class="border p-4">
                        <img src="placeholder.jpg" alt="Product 3">
                        <h3>Product Title</h3>
                        <p>Product Description</p>
                      </div>
                      <div class="border p-4">
                        <img src="placeholder.jpg" alt="Product 4">
                        <h3>Product Title</h3>
                        <p>Product Description</p>
                      </div>
                    </div>
                  `
                },
                {
                  title: 'Featured Product',
                  description: 'Single featured product layout',
                  content: `
                    <div class="flex p-4 bg-gray-50">
                      <div class="w-1/2">
                        <img src="placeholder.jpg" alt="Featured Product">
                      </div>
                      <div class="w-1/2 p-4">
                        <h2 class="text-2xl font-bold">Product Name</h2>
                        <p class="text-gray-600 mt-2">Detailed product description goes here...</p>
                        <div class="mt-4">
                          <strong class="text-xl">$99.99</strong>
                        </div>
                      </div>
                    </div>
                  `
                }
              ]
            }}
          />
        </div>
      </main>
    </div>
  );
} 