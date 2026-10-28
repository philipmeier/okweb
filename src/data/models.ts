// src/data/models.ts
// Single source of truth for AI Model Families and Individual Engines in 10zebra.
// Automatically driven by models.json (synced from ../10z/src/utils/config.js).

import modelsData from './models.json';

export interface ModelVariant {
  key: string;
  name: string;
  family: string;
  method: 'text2vid' | 'im2vid' | 'vid2vid' | 'text2seq' | 'im2im' | 'text2im' | string;
  methodLabel: string;
  methodBadge: string;
  engine: string;
  desc: string;
  cost: number;
  maxRefs: number;
  resolution: string;
  duration: string;
  speed: string;
  hasAudio: boolean;
  isCharacterSwap: boolean;
  isSequence: boolean;
}

export interface ModelFamily {
  slug: string;
  name: string;
  developer: string;
  tagline: string;
  accentColor: string;
  badge: string;
  overview: string;
  strengths: string[];
  tips: string;
  modelCount: number;
  minCost: number;
  maxCost: number;
  methods: string[];
  models: ModelVariant[];
}

export interface ModelsCatalog {
  lastSynced: string;
  source: string;
  totalModels: number;
  totalFamilies: number;
  families: ModelFamily[];
  models: ModelVariant[];
}

export const catalog = modelsData as unknown as ModelsCatalog;

/**
 * Returns all active model families, sorted by model count descending.
 */
export function getModelFamilies(): ModelFamily[] {
  return catalog.families;
}

/**
 * Find a specific model family by its URL slug (e.g. 'kling', 'runway', 'veo', 'seedance').
 */
export function getModelFamily(slug: string): ModelFamily | undefined {
  return catalog.families.find((f) => f.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Get all individual models across all families.
 */
export function getAllModels(): ModelVariant[] {
  return catalog.models;
}

/**
 * Get models belonging to a specific family slug.
 */
export function getModelsByFamily(slug: string): ModelVariant[] {
  return catalog.models.filter((m) => m.family.toLowerCase() === slug.toLowerCase());
}

/**
 * Get unique generation methods with counts.
 */
export function getMethodStats(): { method: string; label: string; count: number }[] {
  const counts: Record<string, { label: string; count: number }> = {};
  catalog.models.forEach((m) => {
    if (!counts[m.method]) {
      counts[m.method] = { label: m.methodLabel, count: 0 };
    }
    counts[m.method].count++;
  });

  return Object.entries(counts).map(([method, data]) => ({
    method,
    label: data.label,
    count: data.count,
  }));
}
