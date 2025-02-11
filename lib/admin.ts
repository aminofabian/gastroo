// List of allowed admin emails
export const ALLOWED_ADMIN_EMAILS = [
  "fabianngaira@gmail.com",
  "aminofabian@gmail.com",
  // Add more admin emails here
];

export const isAllowedAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.includes(email);
}; 