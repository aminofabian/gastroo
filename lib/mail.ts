import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const emailTemplate = (heading: string, message: string, actionLink: string, actionText: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #00563F;">
        <img src="https://gastro.or.ke/images/logo.png" alt="GSK Logo" style="height: 60px;">
      </td>
    </tr>
    <tr>
      <td style="background-color: white; padding: 40px 30px; border-radius: 0 0 4px 4px;">
        <h1 style="color: #00563F; font-size: 24px; margin-bottom: 20px;">${heading}</h1>
        <p style="color: #555; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
          ${message}
        </p>
        <a href="${actionLink}" 
           style="display: inline-block; padding: 12px 30px; background-color: #00563F; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
          ${actionText}
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; color: #666; font-size: 14px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Gastroenterology Society of Kenya</p>
        <p style="margin: 10px 0 0;">This is an automated message, please do not reply to this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `https://gastro.or.ke/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "hello@gastro.or.ke",
    to: email,
    subject: "Reset Your Password - GSK",
    html: emailTemplate(
      "Reset Your Password",
      "You have requested to reset your password for your GSK account. Click the button below to set a new password. If you didn't request this change, you can safely ignore this email.",
      resetLink,
      "Reset Password"
    )
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string) => {
  const confirmLink = `https://gastro.or.ke/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "hello@gastro.or.ke",
    to: email,
    subject: "Verify Your Email - GSK",
    html: emailTemplate(
      "Verify Your Email",
      "Thank you for registering with the Gastroenterology Society of Kenya. Please verify your email address by clicking the button below.",
      confirmLink,
      "Verify Email"
    )
  });
};


