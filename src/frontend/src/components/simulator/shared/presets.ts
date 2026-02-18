// Prisoner's Dilemma presets
export interface PDPayoffs {
  CC: { p1: number; p2: number };
  CD: { p1: number; p2: number };
  DC: { p1: number; p2: number };
  DD: { p1: number; p2: number };
}

export interface PDPreset {
  name: string;
  payoffs: PDPayoffs;
}

export const pdPresets: PDPreset[] = [
  {
    name: 'Classic',
    payoffs: {
      CC: { p1: 3, p2: 3 },
      CD: { p1: 0, p2: 5 },
      DC: { p1: 5, p2: 0 },
      DD: { p1: 1, p2: 1 },
    },
  },
  {
    name: 'High Cooperation Reward',
    payoffs: {
      CC: { p1: 5, p2: 5 },
      CD: { p1: 0, p2: 6 },
      DC: { p1: 6, p2: 0 },
      DD: { p1: 1, p2: 1 },
    },
  },
  {
    name: 'Low Defection Penalty',
    payoffs: {
      CC: { p1: 3, p2: 3 },
      CD: { p1: 1, p2: 4 },
      DC: { p1: 4, p2: 1 },
      DD: { p1: 2, p2: 2 },
    },
  },
];

// Market Entry presets
export interface MarketEntryPayoffs {
  enterEnter: { p1: number; p2: number };
  enterStayOut: { p1: number; p2: number };
  stayOutEnter: { p1: number; p2: number };
  stayOutStayOut: { p1: number; p2: number };
}

export interface MarketEntryPreset {
  name: string;
  payoffs: MarketEntryPayoffs;
}

export const marketEntryPresets: MarketEntryPreset[] = [
  {
    name: 'Competitive Market',
    payoffs: {
      enterEnter: { p1: 2, p2: 2 },
      enterStayOut: { p1: 5, p2: 0 },
      stayOutEnter: { p1: 0, p2: 5 },
      stayOutStayOut: { p1: 3, p2: 3 },
    },
  },
  {
    name: 'High Entry Barrier',
    payoffs: {
      enterEnter: { p1: -1, p2: -1 },
      enterStayOut: { p1: 4, p2: 0 },
      stayOutEnter: { p1: 0, p2: 4 },
      stayOutStayOut: { p1: 2, p2: 2 },
    },
  },
  {
    name: 'First-Mover Advantage',
    payoffs: {
      enterEnter: { p1: 3, p2: 1 },
      enterStayOut: { p1: 6, p2: 0 },
      stayOutEnter: { p1: 0, p2: 4 },
      stayOutStayOut: { p1: 2, p2: 2 },
    },
  },
];

// Bargaining presets
export interface BargainingParams {
  totalSurplus: number;
  disagreementP1: number;
  disagreementP2: number;
  bargainingPowerP1: number;
}

export interface BargainingPreset {
  name: string;
  params: BargainingParams;
}

export const bargainingPresets: BargainingPreset[] = [
  {
    name: 'Equal Power',
    params: {
      totalSurplus: 100,
      disagreementP1: 10,
      disagreementP2: 10,
      bargainingPowerP1: 0.5,
    },
  },
  {
    name: 'Supplier Advantage',
    params: {
      totalSurplus: 100,
      disagreementP1: 20,
      disagreementP2: 5,
      bargainingPowerP1: 0.7,
    },
  },
  {
    name: 'Retailer Advantage',
    params: {
      totalSurplus: 100,
      disagreementP1: 5,
      disagreementP2: 20,
      bargainingPowerP1: 0.3,
    },
  },
];

// Auction presets
export interface AuctionOpponentPreset {
  name: string;
  valuation: number;
  description: string;
}

export const auctionOpponentPresets: AuctionOpponentPreset[] = [
  {
    name: 'Weak Competitor',
    valuation: 50,
    description: 'Opponent values item at $50',
  },
  {
    name: 'Equal Competitor',
    valuation: 75,
    description: 'Opponent values item at $75',
  },
  {
    name: 'Strong Competitor',
    valuation: 100,
    description: 'Opponent values item at $100',
  },
];
