import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

interface CatalogContent {
  title?: string;
  description?: string;
  image?: string;
  price?: string;
  layout?: 'single' | 'grid' | 'featured';
}

interface CatalogSection {
  id: string;
  type: 'header' | 'product' | 'grid' | 'featured';
  content: CatalogContent;
}

interface CatalogData {
  id: string;
  sections: CatalogSection[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

function generateHtml(data: CatalogData) {
  const sections = data.sections.map((section) => {
    switch (section.type) {
      case 'header':
        return `
          <div class="text-center my-8">
            <h1 class="text-4xl font-bold">${section.content.title || ''}</h1>
            <p class="text-gray-600 mt-4">${section.content.description || ''}</p>
          </div>
        `;
      case 'product':
        return `
          <div class="flex gap-8 my-8 p-6 border rounded-lg">
            <div class="w-1/2">
              ${section.content.image ? 
                `<img src="${section.content.image}" alt="${section.content.title}" class="w-full h-64 object-cover rounded"/>` :
                '<div class="w-full h-64 bg-gray-200 rounded"></div>'
              }
            </div>
            <div class="w-1/2 space-y-4">
              <h2 class="text-2xl font-bold">${section.content.title || ''}</h2>
              <p class="text-gray-600">${section.content.description || ''}</p>
              <p class="text-xl font-bold text-green-600">${section.content.price || ''}</p>
            </div>
          </div>
        `;
      case 'grid':
        return `
          <div class="grid grid-cols-2 gap-4 my-8">
            ${[1, 2, 3, 4].map(() => `
              <div class="border p-4 rounded">
                <div class="w-full h-32 bg-gray-200 rounded mb-2"></div>
                <h3 class="text-lg font-semibold">Product Title</h3>
                <p class="text-sm text-green-600">$0.00</p>
              </div>
            `).join('')}
          </div>
        `;
      default:
        return '';
    }
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catalog - ${data.metadata?.createdAt ? new Date(data.metadata.createdAt).toLocaleDateString() : 'Generated'}</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        @page {
          margin: 20px;
          size: A4;
        }
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        .page-break {
          page-break-after: always;
        }
        @media print {
          .page-break {
            page-break-after: always;
          }
        }
      </style>
    </head>
    <body class="bg-white">
      <div class="container">
        ${sections}
      </div>
    </body>
    </html>
  `;
}

async function generatePDF(html: string, outputPath: string) {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const page = await browser.newPage();
  
  // Set content and wait for network idle to ensure all resources are loaded
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Set viewport and PDF options
  await page.setViewport({ width: 1200, height: 800 });
  
  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as CatalogData;
    
    // Ensure the exports directory exists
    const exportsDir = path.join(process.cwd(), 'public', 'exports');
    try {
      await fs.access(exportsDir);
    } catch {
      await fs.mkdir(exportsDir, { recursive: true });
    }

    // Generate HTML content
    const html = generateHtml(data);
    const timestamp = Date.now();

    // Save HTML version
    const htmlFilename = `catalog-${timestamp}.html`;
    const htmlPath = path.join(exportsDir, htmlFilename);
    await fs.writeFile(htmlPath, html, 'utf-8');

    // Generate and save PDF version
    const pdfFilename = `catalog-${timestamp}.pdf`;
    const pdfPath = path.join(exportsDir, pdfFilename);
    await generatePDF(html, pdfPath);

    return NextResponse.json({ 
      htmlUrl: `/exports/${htmlFilename}`,
      pdfUrl: `/exports/${pdfFilename}`,
      success: true 
    });
  } catch (error) {
    console.error('Error exporting catalog:', error);
    return NextResponse.json(
      { error: 'Failed to export catalog', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}