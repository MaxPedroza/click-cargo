import { CarrierPlanKey, CarrierProfile } from './carrier-profile.model';
import { loadJsonFile, saveJsonFile } from '../utils/json-db';

const FILE_PATH = 'data/carrier-profile.json';

function ensureProfile(): CarrierProfile {
  let profile = loadJsonFile<CarrierProfile | null>(FILE_PATH, null);
  if (!profile) {
    profile = {
      id: 1,
      name: 'TransClick Logística',
      plan: 'Free',
      price: 0,
      validUntil: null,
    };
    saveJsonFile(FILE_PATH, profile);
  }
  return profile;
}

function computePlan(planKey: CarrierPlanKey): Pick<CarrierProfile, 'plan' | 'price' | 'validUntil'> {
  const now = Date.now();
  const oneMonthMs = 30 * 24 * 60 * 60 * 1000;

  if (planKey === 'free') {
    return { plan: 'Free', price: 0, validUntil: null };
  }

  if (planKey === 'prata') {
    return {
      plan: 'Plano Prata',
      price: 199,
      validUntil: new Date(now + oneMonthMs).toISOString(),
    };
  }

  return {
    plan: 'Plano Ouro',
    price: 399,
    validUntil: new Date(now + oneMonthMs).toISOString(),
  };
}

export const carrierProfileRepository = {
  getProfile(): CarrierProfile {
    return ensureProfile();
  },

  updatePlan(planKey: CarrierPlanKey): CarrierProfile {
    const current = ensureProfile();
    const planInfo = computePlan(planKey);
    const updated: CarrierProfile = { ...current, ...planInfo };
    saveJsonFile(FILE_PATH, updated);
    return updated;
  },
};
