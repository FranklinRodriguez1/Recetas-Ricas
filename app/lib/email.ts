import nodemailer from 'nodemailer';
import { loadEnv } from './env';

loadEnv();

function getMailConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM || user;
  const secure = process.env.SMTP_SECURE === 'true';

  return { host, port, user, pass, from, secure };
}

function assertMailConfig(config: { host: string; port: number; user?: string; pass?: string; from?: string }) {
  return Boolean(config.host && config.port && config.user && config.pass && config.from);
}

export async function sendRegistrationEmail(to: string) {
  const config = getMailConfig();

  if (!assertMailConfig(config)) {
    console.warn('Missing SMTP configuration. Registration email skipped.', config);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to,
    subject: 'Bienvenido a Recetas Ricas',
    text: `Gracias por registrarte en Recetas Ricas. Tu cuenta ha sido creada exitosamente con ${to}.`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1f2937; padding: 32px;">
        <div style="max-width: 600px; margin: 0 auto; border-radius: 24px; overflow: hidden; box-shadow: 0 18px 60px rgba(15, 23, 42, 0.12); background: #ffffff;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 2.2rem; letter-spacing: -0.04em;">Bienvenido a Recetas Ricas</h1>
            <p style="margin: 12px 0 0; color: rgba(255,255,255,0.88); font-size: 1rem;">Tu aventura en la cocina comienza hoy.</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="margin: 0 0 16px; font-size: 1rem; color: #334155;">Hola,</p>
            <p style="margin: 0 0 16px; color: #475569; font-size: 1rem;">Gracias por registrarte en <strong>Recetas Ricas</strong>. Tu cuenta se ha creado correctamente y ya puedes empezar a explorar recetas deliciosas y guardar tus favoritas.</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; margin: 24px 0;">
              <p style="margin: 0; color: #0f172a; font-weight: 600;">¿Qué puedes hacer ahora?</p>
              <ul style="margin: 12px 0 0 18px; color: #475569;">
                <li>Descubrir recetas nuevas.</li>
                <li>Agregar tus platillos favoritos.</li>
                <li>Acceder rápidamente desde tu cuenta.</li>
              </ul>
            </div>
            <p style="margin: 0; color: #475569; font-size: 0.95rem;">Estamos felices de tenerte con nosotros. ¡A cocinar!</p>
            <div style="margin-top: 28px; text-align: center;">
              <a href="#" style="display: inline-block; background: #f97316; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 600;">Explorar Recetas</a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 20px 24px; text-align: center; color: #64748b; font-size: 0.9rem;">
            <p style="margin: 0;">Recetas Ricas &mdash; Tu cocina, tu sabor.</p>
          </div>
        </div>
      </div>
    `,
  });
}

