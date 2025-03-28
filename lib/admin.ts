// List of allowed admin emails
export const ALLOWED_ADMIN_EMAILS = [
  "fabianngaira@gmail.com",
  "aminofab@gmail.com",
  "noorwex@gmail.com",
  "secretarygsk@gmail.com",
  ];

export const isAllowedAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email);
}; 