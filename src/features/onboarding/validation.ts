export function validateProfile(displayName: string, username: string): string | undefined {
  if (displayName.trim().length < 2) return 'Add a display name with at least 2 characters.';
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) return 'Use 3–20 letters, numbers, or underscores.';
  return undefined;
}
