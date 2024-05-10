const isUppercase = (value: string) => /[A-Z]/.test(value);
const isLowercase = (value: string) => /[a-z]/.test(value);
const hasNumber = (value: string) => /\d/.test(value);
const isNotWhitespace = (value: string) => /^\S.*\S$/.test(value);
export default {
  uppercase: (value: string) =>
    isUppercase(value) || 'Password must contain at least one uppercase character A-Z',
  lowercase: (value: string) =>
    isLowercase(value) || 'Password must contain at least one lowercase character a-z',
  number: (value: string) => hasNumber(value) || 'Password must contain at least one number',
  notWhitespace: (value: string) =>
    isNotWhitespace(value) || 'Password must not start or end with whitespace',
  length: (value: string) => value.length >= 8 || 'Password must be at least 8 characters long',
};
