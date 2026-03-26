import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { error } = await supabase.from('rezervari').insert({
    nume: body.nume,
    email: body.email,
    telefon: body.telefon,
    data: body.data,
    ora: body.ora,
    persoane: parseInt(body.persoane),
    mesaj: body.mesaj || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
