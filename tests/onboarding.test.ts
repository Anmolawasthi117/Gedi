import { validateProfile } from '@/features/onboarding/validation';

describe('profile validation', () => {
  it('accepts a valid local profile', () => {
    expect(validateProfile('Anmol', 'anmol_explores')).toBeUndefined();
  });

  it('rejects a short display name', () => {
    expect(validateProfile('A', 'anmol')).toContain('display name');
  });

  it('rejects invalid usernames', () => {
    expect(validateProfile('Anmol', 'anmol explores')).toContain('letters');
  });
});
