import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import type { HomepageData } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data: HomepageData = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: HomepageData = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing data file:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
