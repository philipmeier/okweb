/**
 * SITE CONFIGURATION & FEATURE GATES
 *
 * Flip any boolean in `featureGates` to `true` to re-enable gated functionality
 * across pages, components, pricing tables, FAQs, and sitemaps.
 */

export interface FeatureGates {
  /**
   * 5a, 5e & 2: Subscription tiers (Maker & Director), annual billing toggle, and subscriber top-up discounts.
   * - When `false` (default now): Site boasts a simple Pay-As-You-Go model (no subscription required),
   *   free team collaborator seats per project, and MCP access via the 10zebra Partner Program.
   * - When `true`: Restores Free / Maker ($29) / Director ($79) subscription tiers,
   *   Maker (2 team seats/project) & Director (Unlimited team seats), subscriber top-up discounts,
   *   and Director-level MCP access.
   */
  subscriptions: boolean;

  /**
   * 1 & 5b: Failed Generation Protection (90% credit refund || free regen).
   * - Forefront site-wide callout banners and hero stats are permanently removed.
   * - When `false` (default now): Coming soon — hidden from FAQs and comparison tables as well.
   * - When `true`: Shown ONLY in main FAQs and comparison charts.
   */
  failedGenerationProtection: boolean;

  /**
   * 5c: Creator Referral Program (3% lifetime commission via Tolt).
   * - When `false` (default now): Coming soon — hidden from active features catalog, footer, pricing, and FAQs.
   * - When `true`: Restores Referral Program across all surfaces.
   */
  referralProgram: boolean;

  /**
   * 5d: Agentic Workflows (Agent Z conversational batch assistant & Dry Run preview).
   * - When `false` (default now): Hidden from active features catalog, product tour, mockups, and FAQs.
   * - When `true`: Restores Agent Z across all surfaces.
   */
  agenticWorkflows: boolean;
}

export const featureGates: FeatureGates = {
  subscriptions: false,
  failedGenerationProtection: false,
  referralProgram: false,
  agenticWorkflows: false,
};

export const mcpPartnerConfig = {
  email: 'partners@10zebra.com',
  subject: '10zebra MCP Partner Program Access Request',
  mailtoUrl:
    'mailto:partners@10zebra.com?subject=10zebra%20MCP%20Partner%20Program%20Access%20Request',
  badgeLabel: 'Partner Program Access',
  ctaLabel: 'Request Partner Access',
};

