import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/public', 'data.csv');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Parse CSV to JSON
    const records = parse(fileContents, {
      columns: true, // Treat the first row as headers
      skip_empty_lines: true,
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}
