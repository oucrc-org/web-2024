import { NextRequest, NextResponse } from 'next/server';
import { FORMS } from '@/config/form';
import { postToGoogleForm } from '@/utils/form';
import { redirect } from 'next/navigation';

function getConfigByParam(formType: string) {
  if (Object.keys(FORMS).includes(formType)) {
    return FORMS[formType as keyof typeof FORMS];
  }
  return null;
}

/** GET: [formType]に応じてフォームページに転送 */
export async function GET(
  req: NextRequest,
  {
    params: { formType },
  }: {
    params: { formType: string };
  }
) {
  const config = getConfigByParam(formType);
  if (config) {
    redirect(`https://docs.google.com/forms/d/e/${config.formId}/viewform`);
  } else {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
}

/**
 * POST: JSONを投げると[formType]に応じて送信
 */
export async function POST(
  req: NextRequest,
  {
    params: { formType },
  }: {
    params: { formType: string };
  }
) {
  const config = getConfigByParam(formType);
  if (config) {
    const data = await req.json();
    if (data) {
      return await postToGoogleForm(config, data)
        .then(() => {
          return NextResponse.json({ message: 'Contact form sent' });
        })
        .catch((e) => {
          return NextResponse.json(
            { message: e.message ?? e },
            { status: 500 }
          );
        });
    } else {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
}
