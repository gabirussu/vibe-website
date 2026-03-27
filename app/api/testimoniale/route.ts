import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  const { data, error } = await supabase
    .from('testimoniale')
    .select('*')
    .order('creat_la', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const titlu = formData.get('titlu') as string || '';

  if (!file) return NextResponse.json({ error: 'Niciun fișier' }, { status: 400 });

  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from('testimoniale')
    .upload(fileName, buffer, { contentType: file.type });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

  const { data: urlData } = supabase.storage.from('testimoniale').getPublicUrl(fileName);

  const { data, error } = await supabase
    .from('testimoniale')
    .insert({ url: urlData.publicUrl, titlu })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { id, fileName } = await req.json();

  await supabase.storage.from('testimoniale').remove([fileName]);
  const { error } = await supabase.from('testimoniale').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
