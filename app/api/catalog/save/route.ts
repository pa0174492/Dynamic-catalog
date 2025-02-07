import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Ensure the catalogs directory exists
    const catalogsDir = path.join(process.cwd(), 'public', 'catalogs');
    try {
      await fs.access(catalogsDir);
    } catch {
      await fs.mkdir(catalogsDir, { recursive: true });
    }
    
    // Generate a unique filename for the catalog
    const filename = `catalog-${Date.now()}.json`;
    const filePath = path.join(catalogsDir, filename);
    
    // Save catalog data as JSON
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      url: `/catalogs/${filename}`,
      success: true 
    });
  } catch (error) {
    console.error('Error saving catalog:', error);
    return NextResponse.json(
      { error: 'Failed to save catalog', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 