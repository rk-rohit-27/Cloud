import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function generateEmailHtml(title: string, content: string, actionUrl?: string, actionText?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: #ffffff; border-bottom: 1px solid #e4e4e7;">
                    <h1 style="margin: 0; color: #18181b; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                      NexaSky<span style="color: #0080ff;">Cloud</span>
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                    ${content}
                    ${actionUrl && actionText ? \`
                    <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
                      <a href="\${actionUrl}" style="display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                        \${actionText}
                      </a>
                    </div>
                    \` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center;">
                    <p style="margin: 0; color: #71717a; font-size: 13px;">
                      &copy; ${new Date().getFullYear()} NexaSkyCloud. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0; color: #a1a1aa; font-size: 12px;">
                      This is an automated message, please do not reply.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const from =
    process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@nexaskycloud.com";

  await transporter.sendMail({ from, to, subject, html });
}
