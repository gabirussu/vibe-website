import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Validare backend
  const { nume, email, telefon, data, ora, persoane } = body;

  if (!nume || typeof nume !== 'string' || nume.trim().length < 3)
    return NextResponse.json({ error: 'Nume invalid.' }, { status: 400 });

  const telCurat = (telefon || '').replace(/\s/g, '');
  if (!/^(\+407|07)\d{8}$/.test(telCurat))
    return NextResponse.json({ error: 'Telefon invalid.' }, { status: 400 });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: 'Email invalid.' }, { status: 400 });

  if (!data || isNaN(Date.parse(data)))
    return NextResponse.json({ error: 'Data invalidă.' }, { status: 400 });

  const azi = new Date(); azi.setHours(0, 0, 0, 0);
  if (new Date(data) < azi)
    return NextResponse.json({ error: 'Data nu poate fi în trecut.' }, { status: 400 });

  if (!ora || !/^\d{2}:\d{2}$/.test(ora))
    return NextResponse.json({ error: 'Ora invalidă.' }, { status: 400 });

  const [h, m] = ora.split(':').map(Number);
  const minute = h * 60 + m;
  const zi = new Date(data).getDay();
  const eWeekend = zi === 0 || zi === 6;
  const minStart = eWeekend ? 8 * 60 : 7 * 60;
  const maxEnd = eWeekend ? 22 * 60 : 21 * 60;
  if (minute < minStart || minute > maxEnd)
    return NextResponse.json({ error: 'Ora este în afara programului.' }, { status: 400 });

  const nrPersoane = parseInt(persoane);
  if (isNaN(nrPersoane) || nrPersoane < 1 || nrPersoane > 8)
    return NextResponse.json({ error: 'Număr de persoane invalid.' }, { status: 400 });

  try {
    const { error } = await supabase.from('rezervari').insert({
      nume: nume.trim(),
      email: email.trim(),
      telefon: telCurat,
      data,
      ora,
      persoane: nrPersoane,
      mesaj: body.mesaj || null,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Fetch error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
