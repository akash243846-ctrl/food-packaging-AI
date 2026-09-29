// ===============================================================================
// FSSAI OFFICIAL REGULATIONS DATASET (Government of India Gazettes)
// 1. Food Safety and Standards (Alcoholic Beverages) Regulations, 2018
// 2. Food Safety and Standards (Contaminants, Toxins and Residues) Regulations, 2011
// 3. Food Safety and Standards (Food Products Standards & Food Additives) Regulations, 2011
// 4. Food Safety and Standards (Fortification of Foods) Regulations, 2018 & Nutraceuticals 2016
// ===============================================================================

export interface AlcoholicBeverageStandard {
  category: string;
  beverageName: string;
  subType?: string;
  ethanolPctVolume: string; // e.g. "36 to 50"
  evapResiduePctMax: number | string; // % (m/v)
  volatileAcidsMax: number | string; // g/100 L absolute alcohol (as acetic acid)
  higherAlcoholsMax: number | string; // g/100 L absolute alcohol (as amyl alcohol)
  methylAlcoholMax: number | string; // g/100 L absolute alcohol (or mg/L for beer/wine)
  totalEstersMax: number | string; // g/100 L absolute alcohol (as ethyl acetate)
  furfuralMax: number | string; // g/100 L absolute alcohol
  aldehydesMax: number | string; // g/100 L absolute alcohol (as acetaldehyde)
  arsenicMgLMax: number;
  cadmiumMgLMax: number;
  copperMgLMax: number;
  leadMgLMax: number;
  mercuryMgLMax: number | string;
  specialNotes?: string;
}

export interface MetalContaminantStandard {
  metal: string;
  articleOfFood: string;
  ppmMax: number | string;
  category: 'Beverages' | 'Dairy' | 'Edible Oils & Fats' | 'Spices & Herbs' | 'Canned / Processed' | 'General / Other';
}

export interface CropContaminantStandard {
  contaminant: string;
  foodArticle: string;
  limitUgKg: number | string;
  unit: string;
  healthRisk: string;
}

export interface NaturalToxinStandard {
  substance: string;
  maxLimitPpm: number;
  naturalOccurrence: string;
  warningNote: string;
}

export interface FoodFortificationStandard {
  commodity: string;
  commodityHi: string;
  category: 'Staple' | 'Dairy' | 'Condiment' | 'Grain';
  fortificant: string;
  level: string;
  sourceOfNutrient: string;
  mandatoryWarning?: string;
  fssaiSchedule: string;
  benefits: string;
}

export interface InsAdditive {
  insNo: string;
  name: string;
  nameHi: string;
  category: string;
  functionalClass: string;
  maxPermittedLevel: string;
}

export interface BotanicalSupplement {
  sNo: number;
  botanicalName: string;
  commonName: string;
  commonNameHi: string;
  partUsed: string;
  dailyAdultDose: string;
  precautions?: string;
}

// -------------------------------------------------------------------------------
// 1. ALCOHOLIC BEVERAGES REGULATIONS 2018 (TABLE 1, 2, 3)
// -------------------------------------------------------------------------------
export const ALCOHOLIC_BEVERAGES_STANDARDS: AlcoholicBeverageStandard[] = [
  {
    category: 'Distilled Spirit',
    beverageName: 'Brandy / Grape Brandy',
    subType: 'Distilled from fermented grape juice or wine',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 100.0,
    higherAlcoholsMax: 600.0,
    methylAlcoholMax: 150.0,
    totalEstersMax: 350.0,
    furfuralMax: 12.0,
    aldehydesMax: 45.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Matured for not less than 1 year in oak vats if labelled as "matured" or "aged".',
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Blended Brandy',
    subType: 'Min 2% pure grape brandy blended with neutral spirit',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 100.0,
    higherAlcoholsMax: 350.0,
    methylAlcoholMax: 100.0,
    totalEstersMax: 250.0,
    furfuralMax: 12.0,
    aldehydesMax: 45.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Rum (Dark / Cane Rum)',
    subType: 'Fermented sugarcane juice, molasses, with caramel color',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 50.0,
    higherAlcoholsMax: 350.0,
    methylAlcoholMax: 20.0,
    totalEstersMax: 150.0,
    furfuralMax: 10.0,
    aldehydesMax: 30.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Flavoured rum maximum residue limit is 25% (m/v).',
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'White Rum',
    subType: 'Distillate without caramel colour addition',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 1.0,
    volatileAcidsMax: 50.0,
    higherAlcoholsMax: 200.0,
    methylAlcoholMax: 10.0,
    totalEstersMax: 150.0,
    furfuralMax: 5.0,
    aldehydesMax: 30.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Vodka',
    subType: 'Neutral spirit from rye, potato, cassava or grains',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 10.0,
    higherAlcoholsMax: 50.0,
    methylAlcoholMax: 10.0,
    totalEstersMax: 50.0,
    furfuralMax: 12.0,
    aldehydesMax: 15.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Flavoured vodka max residue limit is 25% (m/v).',
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Whisky / Grain Whisky / Single Malt',
    subType: 'Fermented mash of malted/unmalted barley, corn, rye',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 150.0,
    higherAlcoholsMax: 750.0,
    methylAlcoholMax: 30.0,
    totalEstersMax: 200.0,
    furfuralMax: 12.0,
    aldehydesMax: 50.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Single Malt distilled solely in pot still at single distillery.',
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Blended Whisky',
    subType: 'Min 2% barley malt or grain whisky blended with neutral spirit',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.0,
    volatileAcidsMax: 100.0,
    higherAlcoholsMax: 750.0,
    methylAlcoholMax: 20.0,
    totalEstersMax: 150.0,
    furfuralMax: 6.0,
    aldehydesMax: 35.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Gin',
    subType: 'Neutral spirit flavoured with juniper berries & botanicals',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 2.5,
    volatileAcidsMax: 10.0,
    higherAlcoholsMax: 100.0,
    methylAlcoholMax: 20.0,
    totalEstersMax: 30.0,
    furfuralMax: 12.0,
    aldehydesMax: 20.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Must remain clear without turbidity upon dilution with water.',
  },
  {
    category: 'Country Liquor',
    beverageName: 'Plain Country Liquor (सादी देशी शराब)',
    subType: 'Distilled from molasses, jaggery (gur), mahua, or cassava',
    ethanolPctVolume: '19.0 to 43.0%',
    evapResiduePctMax: 1.0,
    volatileAcidsMax: 100.0,
    higherAlcoholsMax: 250.0,
    methylAlcoholMax: 50.0,
    totalEstersMax: 150.0,
    furfuralMax: 12.0,
    aldehydesMax: 35.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Not Applicable',
  },
  {
    category: 'Country Liquor',
    beverageName: 'Fenny / Feni (काजू या नारियल फेनी)',
    subType: 'Distilled from cashew apple juice or coconut toddy',
    ethanolPctVolume: '19.0 to 43.0%',
    evapResiduePctMax: 0.2,
    volatileAcidsMax: 60.0,
    higherAlcoholsMax: 100.0,
    methylAlcoholMax: 150.0,
    totalEstersMax: 50.0,
    furfuralMax: 5.0,
    aldehydesMax: 25.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Absent in Coconut Feni',
  },
  {
    category: 'Distilled Spirit',
    beverageName: 'Pot-Still Distilled Spirits',
    subType: 'Distillate from multiple pot stills of agricultural wash',
    ethanolPctVolume: '36.0 to 50.0%',
    evapResiduePctMax: 4.0,
    volatileAcidsMax: 150.0,
    higherAlcoholsMax: 750.0,
    methylAlcoholMax: 300.0,
    totalEstersMax: 350.0,
    furfuralMax: 12.0,
    aldehydesMax: 50.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Not Applicable',
  },
  {
    category: 'Wine & Fermented',
    beverageName: 'Table Wine (Red / White / Rose)',
    subType: 'Fermented juice of fresh sound grapes',
    ethanolPctVolume: '7.0 to 15.5%',
    evapResiduePctMax: 50.0, // g/L sugar-free extract
    volatileAcidsMax: 1.2, // g/L as acetic acid
    higherAlcoholsMax: 4.0, // g/L of absolute alcohol
    methylAlcoholMax: 400.0, // mg/L of wine (250 for white, 400 for red)
    totalEstersMax: 4.0, // g/L absolute alcohol
    furfuralMax: 'N/A',
    aldehydesMax: 1.0, // g/L absolute alcohol
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Added water <= 30 ml/kg grape. If SO2 > 10 mg/L, allergen declaration required.',
  },
  {
    category: 'Wine & Fermented',
    beverageName: 'Sparkling Wine / Brut / Extra Dry',
    subType: 'CO2 min 7.0 g/L or 3.5 bar pressure at 20°C',
    ethanolPctVolume: '7.0 to 15.5%',
    evapResiduePctMax: 50.0,
    volatileAcidsMax: 1.2,
    higherAlcoholsMax: 4.0,
    methylAlcoholMax: 400.0,
    totalEstersMax: 4.0,
    furfuralMax: 'N/A',
    aldehydesMax: 1.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'N/A',
    specialNotes: 'Brut: sugar < 1.2%; Extra-dry: 1.2-1.7%; Dry: 1.7-3.2%; Sweet: > 5.0%.',
  },
  {
    category: 'Wine & Fermented',
    beverageName: 'Fortified Wine / Dessert Wine',
    subType: 'Wine strengthened with grape brandy / neutral spirit',
    ethanolPctVolume: '15.0 to 24.0%',
    evapResiduePctMax: 180.0,
    volatileAcidsMax: 1.2,
    higherAlcoholsMax: 4.0,
    methylAlcoholMax: 400.0,
    totalEstersMax: 4.0,
    furfuralMax: 'N/A',
    aldehydesMax: 1.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Min 7.0% alcohol must come from natural fruit fermentation.',
  },
  {
    category: 'Wine & Fermented',
    beverageName: 'Cider (Apple) & Perry (Pear)',
    subType: 'Fermented juice of apple (Cider) or pear (Perry)',
    ethanolPctVolume: '0.5 to 9.0%',
    evapResiduePctMax: 50.0,
    volatileAcidsMax: 1.2,
    higherAlcoholsMax: 2.0,
    methylAlcoholMax: 250.0,
    totalEstersMax: 0.2,
    furfuralMax: 'N/A',
    aldehydesMax: 1.0,
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.01,
    copperMgLMax: 5.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 0.25,
    specialNotes: 'Soft cider: 0.5-5.0% abv; Hard cider: 5.0-9.0% abv.',
  },
  {
    category: 'Beer & Brewed',
    beverageName: 'Regular / Mild Beer (िनयिमत बीयर)',
    subType: 'Lager / Ale brewed from malted barley and hops',
    ethanolPctVolume: '0.5 to 5.0%',
    evapResiduePctMax: 'Per Table 3',
    volatileAcidsMax: 'pH 3.3 - 4.8',
    higherAlcoholsMax: 'N/A',
    methylAlcoholMax: 50.0, // mg/L max
    totalEstersMax: 'N/A',
    furfuralMax: 'N/A',
    aldehydesMax: 'CO₂ min 1.8 - 3.6 v/v',
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.1,
    copperMgLMax: 2.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Absent',
    specialNotes: 'Total Plate Count < 10 cfu/ml; Coliforms Absent; Yeast/Mould Absent.',
  },
  {
    category: 'Beer & Brewed',
    beverageName: 'Strong Beer (स्ट्रॉन्ग बीयर)',
    subType: 'High alcohol malt brew',
    ethanolPctVolume: '5.0 to 8.0%',
    evapResiduePctMax: 'Per Table 3',
    volatileAcidsMax: 'pH 3.3 - 4.8',
    higherAlcoholsMax: 'N/A',
    methylAlcoholMax: 50.0,
    totalEstersMax: 'N/A',
    furfuralMax: 'N/A',
    aldehydesMax: 'CO₂ min 1.8 - 3.6 v/v',
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.1,
    copperMgLMax: 2.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Absent',
    specialNotes: 'Total Plate Count < 10 cfu/ml; Coliforms Absent.',
  },
  {
    category: 'Beer & Brewed',
    beverageName: 'Draught Beer (ड्रॉट बीयर - केग/कास्क)',
    subType: 'Served unpasteurized from cask or keg',
    ethanolPctVolume: '0.5 to 8.0%',
    evapResiduePctMax: 'Per Table 3',
    volatileAcidsMax: 'pH 3.3 - 4.8',
    higherAlcoholsMax: 'N/A',
    methylAlcoholMax: 50.0,
    totalEstersMax: 'N/A',
    furfuralMax: 'N/A',
    aldehydesMax: 'CO₂ min 1.8 - 3.6 v/v',
    arsenicMgLMax: 0.25,
    cadmiumMgLMax: 0.1,
    copperMgLMax: 2.0,
    leadMgLMax: 0.2,
    mercuryMgLMax: 'Absent',
    specialNotes: 'Total Plate Count < 100 cfu/ml; Coliforms Absent; Yeast & Mold max 40 cfu/ml.',
  },
];

// -------------------------------------------------------------------------------
// 2. CONTAMINANTS, TOXINS AND RESIDUES REGULATIONS, 2011
// -------------------------------------------------------------------------------
export const METAL_CONTAMINANTS_STANDARDS: MetalContaminantStandard[] = [
  // LEAD (Pb)
  { metal: 'Lead (Pb)', articleOfFood: 'Concentrated soft drinks', ppmMax: 0.5, category: 'Beverages' },
  { metal: 'Lead (Pb)', articleOfFood: 'Fruit and vegetable juice (including tomato juice)', ppmMax: 1.0, category: 'Beverages' },
  { metal: 'Lead (Pb)', articleOfFood: 'Concentrates used in soft drinks, lime/lemon juice', ppmMax: 2.0, category: 'Beverages' },
  { metal: 'Lead (Pb)', articleOfFood: 'Baking powder', ppmMax: 10.0, category: 'General / Other' },
  { metal: 'Lead (Pb)', articleOfFood: 'Edible oils and fats', ppmMax: 0.5, category: 'Edible Oils & Fats' },
  { metal: 'Lead (Pb)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: 0.2, category: 'Dairy' },
  { metal: 'Lead (Pb)', articleOfFood: 'Turmeric whole and powder', ppmMax: 10.0, category: 'Spices & Herbs' },
  { metal: 'Lead (Pb)', articleOfFood: 'Refined sugar & dextrose', ppmMax: 0.5, category: 'General / Other' },
  { metal: 'Lead (Pb)', articleOfFood: 'Ice-cream, iced lollies, frozen confections', ppmMax: 1.0, category: 'Dairy' },
  { metal: 'Lead (Pb)', articleOfFood: 'Canned fish, canned meats, edible gelatin', ppmMax: 5.0, category: 'Canned / Processed' },
  { metal: 'Lead (Pb)', articleOfFood: 'Tea, dried herbs, spices flavourings', ppmMax: 10.0, category: 'Spices & Herbs' },
  { metal: 'Lead (Pb)', articleOfFood: 'Solid pectin', ppmMax: 50.0, category: 'General / Other' },
  { metal: 'Lead (Pb)', articleOfFood: 'Hard boiled sugar confectionery', ppmMax: 2.0, category: 'General / Other' },
  { metal: 'Lead (Pb)', articleOfFood: 'Foods not specified (General baseline)', ppmMax: 2.5, category: 'General / Other' },

  // COPPER (Cu)
  { metal: 'Copper (Cu)', articleOfFood: 'Carbonated water', ppmMax: 1.5, category: 'Beverages' },
  { metal: 'Copper (Cu)', articleOfFood: 'Soft drinks excluding carbonated water', ppmMax: 7.0, category: 'Beverages' },
  { metal: 'Copper (Cu)', articleOfFood: 'Toddy (fermented palm sap)', ppmMax: 5.0, category: 'Beverages' },
  { metal: 'Copper (Cu)', articleOfFood: 'Tomato puree, paste, powder, juice & cocktails', ppmMax: 100.0, category: 'Canned / Processed' },
  { metal: 'Copper (Cu)', articleOfFood: 'Tomato ketchup', ppmMax: 50.0, category: 'Canned / Processed' },
  { metal: 'Copper (Cu)', articleOfFood: 'Tea leaves/manufactured', ppmMax: 150.0, category: 'Beverages' },
  { metal: 'Copper (Cu)', articleOfFood: 'Cocoa powder', ppmMax: 70.0, category: 'General / Other' },
  { metal: 'Copper (Cu)', articleOfFood: 'Juice/pulp of orange, apple, tomato, pineapple', ppmMax: 5.0, category: 'Beverages' },
  { metal: 'Copper (Cu)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: '15.0 (min 2.8)', category: 'Dairy' },
  { metal: 'Copper (Cu)', articleOfFood: 'Foods not specified', ppmMax: 30.0, category: 'General / Other' },

  // ARSENIC (As)
  { metal: 'Arsenic (As)', articleOfFood: 'Milk', ppmMax: 0.1, category: 'Dairy' },
  { metal: 'Arsenic (As)', articleOfFood: 'Carbonated water', ppmMax: 0.25, category: 'Beverages' },
  { metal: 'Arsenic (As)', articleOfFood: 'Soft drink for consumption after dilution', ppmMax: 0.5, category: 'Beverages' },
  { metal: 'Arsenic (As)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: 0.05, category: 'Dairy' },
  { metal: 'Arsenic (As)', articleOfFood: 'Turmeric whole and powder', ppmMax: 0.1, category: 'Spices & Herbs' },
  { metal: 'Arsenic (As)', articleOfFood: 'Juice of orange, grape, apple, tomato, pineapple', ppmMax: 0.2, category: 'Beverages' },
  { metal: 'Arsenic (As)', articleOfFood: 'Foods not specified', ppmMax: 1.1, category: 'General / Other' },

  // TIN (Sn)
  { metal: 'Tin (Sn)', articleOfFood: 'Processed and canned products in tin plate', ppmMax: 250.0, category: 'Canned / Processed' },
  { metal: 'Tin (Sn)', articleOfFood: 'Jam, jellies and marmalade', ppmMax: 250.0, category: 'Canned / Processed' },
  { metal: 'Tin (Sn)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: 5.0, category: 'Dairy' },
  { metal: 'Tin (Sn)', articleOfFood: 'Hard boiled sugar confectionery', ppmMax: 5.0, category: 'General / Other' },
  { metal: 'Tin (Sn)', articleOfFood: 'Turmeric whole and powder', ppmMax: 'Nil', category: 'Spices & Herbs' },

  // ZINC (Zn)
  { metal: 'Zinc (Zn)', articleOfFood: 'Ready-to-drink beverages', ppmMax: 5.0, category: 'Beverages' },
  { metal: 'Zinc (Zn)', articleOfFood: 'Fruit juice and pulp products', ppmMax: 5.0, category: 'Beverages' },
  { metal: 'Zinc (Zn)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: '50.0 (min 25.0)', category: 'Dairy' },
  { metal: 'Zinc (Zn)', articleOfFood: 'Fruit and vegetable products', ppmMax: 50.0, category: 'Canned / Processed' },
  { metal: 'Zinc (Zn)', articleOfFood: 'Foods not specified', ppmMax: 50.0, category: 'General / Other' },

  // CADMIUM (Cd)
  { metal: 'Cadmium (Cd)', articleOfFood: 'Infant milk substitute and infant foods', ppmMax: 0.1, category: 'Dairy' },
  { metal: 'Cadmium (Cd)', articleOfFood: 'Turmeric whole and powder', ppmMax: 0.1, category: 'Spices & Herbs' },
  { metal: 'Cadmium (Cd)', articleOfFood: 'Other foods (General baseline)', ppmMax: 1.5, category: 'General / Other' },

  // MERCURY (Hg) & CHROMIUM & NICKEL
  { metal: 'Mercury (Hg)', articleOfFood: 'Fish & marine seafood', ppmMax: 0.5, category: 'General / Other' },
  { metal: 'Mercury (Hg)', articleOfFood: 'Other foods (General baseline)', ppmMax: 1.0, category: 'General / Other' },
  { metal: 'Methyl Mercury', articleOfFood: 'All foods (calculated as element)', ppmMax: 0.25, category: 'General / Other' },
  { metal: 'Chromium (Cr)', articleOfFood: 'Refined sugar', ppmMax: '20 ppb', category: 'General / Other' },
  { metal: 'Nickel (Ni)', articleOfFood: 'Hydrogenated vegetable oils (Vanaspati, margarine)', ppmMax: 1.5, category: 'Edible Oils & Fats' },
];

export const CROP_CONTAMINANTS_STANDARDS: CropContaminantStandard[] = [
  {
    contaminant: 'Aflatoxin (Total B1, B2, G1, G2)',
    foodArticle: 'All articles of food (Grains, Nuts, Corn, Spices)',
    limitUgKg: 30.0,
    unit: 'µg/kg (ppb)',
    healthRisk: 'Carcinogenic mycotoxin produced by Aspergillus flavus. Liver toxicity & cancer.',
  },
  {
    contaminant: 'Aflatoxin M1',
    foodArticle: 'Milk & Dairy products',
    limitUgKg: 0.5,
    unit: 'µg/kg (ppb)',
    healthRisk: 'Secreted in milk of cows fed contaminated feed; infant liver toxin.',
  },
  {
    contaminant: 'Patulin',
    foodArticle: 'Apple juice & apple juice ingredients in other beverages',
    limitUgKg: 50.0,
    unit: 'µg/kg (ppb)',
    healthRisk: 'Produced by Penicillium expansum in rotten apples; gastrointestinal immune toxin.',
  },
  {
    contaminant: 'Ochratoxin A',
    foodArticle: 'Wheat, barley, rye and grain products',
    limitUgKg: 20.0,
    unit: 'µg/kg (ppb)',
    healthRisk: 'Produced by Aspergillus ochraceus; severe nephrotoxin causing kidney damage.',
  },
];

export const NATURAL_TOXINS_STANDARDS: NaturalToxinStandard[] = [
  {
    substance: 'Agaric acid (एगारिक एसिड)',
    maxLimitPpm: 100,
    naturalOccurrence: 'Mushrooms and fungus-derived ingredients',
    warningNote: 'Strong irritant to mucous membranes; toxic in higher concentrations.',
  },
  {
    substance: 'Hydrocyanic acid (HCN / सायनाइड)',
    maxLimitPpm: 5,
    naturalOccurrence: 'Cassava roots, bitter almonds, stone fruit kernels, bamboo shoots',
    warningNote: 'Inhibits cellular cytochrome c oxidase; lethal metabolic poison if unhydrolyzed.',
  },
  {
    substance: 'Hypericine (हाइपरिसिन)',
    maxLimitPpm: 1,
    naturalOccurrence: 'St. John’s Wort (Hypericum perforatum) and related botanical infusions',
    warningNote: 'Causes severe phototoxicity, dermal blistering and MAO interactions.',
  },
  {
    substance: 'Saffrole (सैफ्रोल)',
    maxLimitPpm: 10,
    naturalOccurrence: 'Sassafras, nutmeg (jaiphal), mace (javitri), star anise oils',
    warningNote: 'Hepatocarcinogen; strictly limited to trace levels in all food and drinks.',
  },
];

// -------------------------------------------------------------------------------
// 3. FOOD FORTIFICATION REGULATIONS, 2018 (+F LOGO & MANDATORY STANDARDS)
// -------------------------------------------------------------------------------
export const FOOD_FORTIFICATION_STANDARDS: FoodFortificationStandard[] = [
  {
    commodity: 'Fortified Iodized Salt',
    commodityHi: 'आयोडीनयुक्त नमक',
    category: 'Condiment',
    fortificant: 'Iodine (I)',
    level: '20 - 30 ppm at manufacture level; 15 - 30 ppm at retail distribution (dry basis)',
    sourceOfNutrient: 'Potassium Iodate (KIO₃)',
    fssaiSchedule: 'Schedule-I Clause 1',
    benefits: 'Prevents Iodine Deficiency Disorders (IDD), goiter, mental retardation & cretinism.',
  },
  {
    commodity: 'Double Fortified Salt (DFS)',
    commodityHi: 'आयरन व आयोडीन युक्त दोहरा सुदृढ़ीकृत नमक',
    category: 'Condiment',
    fortificant: 'Iron (Fe) + Iodine (I)',
    level: 'Iron: 850 - 1100 ppm (as Fe); Iodine: 20-30 ppm at mfg, 15-30 ppm retail',
    sourceOfNutrient: 'Ferrous sulphate / Ferrous fumarate + Potassium Iodate with food-grade HPMC encapsulation',
    mandatoryWarning: 'Statement on label: "People with Thalassemia may take under medical supervision".',
    fssaiSchedule: 'Schedule-I Clause 1(2)',
    benefits: 'Simultaneously combats widespread nutritional anemia and iodine deficiency.',
  },
  {
    commodity: 'Fortified Edible Vegetable Oil',
    commodityHi: 'सुदृढ़ीकृत खाद्य तेल',
    category: 'Staple',
    fortificant: 'Vitamin A & Vitamin D',
    level: 'Vitamin A: 6 - 9.9 µg RE/g oil; Vitamin D: 0.11 - 0.16 µg/g oil (from plant source)',
    sourceOfNutrient: 'Retinyl acetate or Retinyl palmitate + Cholecalciferol or Ergocalciferol',
    fssaiSchedule: 'Schedule-I Clause 2',
    benefits: 'Supports ocular vision, epithelial integrity, bone calcification and immunity.',
  },
  {
    commodity: 'Fortified Milk',
    commodityHi: 'सुदृढ़ीकृत दूध (टोन्ड/डबल टोन्ड/मानकीकृत)',
    category: 'Dairy',
    fortificant: 'Vitamin A & Vitamin D',
    level: 'Vitamin A: 270 - 450 µg RE per Litre; Vitamin D: 5.0 - 7.5 µg per Litre',
    sourceOfNutrient: 'Retinyl acetate / palmitate + Ergocalciferol / Cholecalciferol (plant source)',
    fssaiSchedule: 'Schedule-I Clause 3',
    benefits: 'Replaces natural fat-soluble vitamins lost during skimming and homogenization.',
  },
  {
    commodity: 'Fortified Atta (Wheat Flour)',
    commodityHi: 'सुदृढ़ीकृत गेहूं का आटा',
    category: 'Grain',
    fortificant: 'Iron + Folic Acid + Vitamin B12',
    level: 'Iron: 28 - 42.5 mg/kg (or NaFeEDTA: 14 - 21.25 mg/kg); Folic Acid: 75 - 125 µg/kg; Vit B12: 0.75 - 1.25 µg/kg',
    sourceOfNutrient: 'Ferrous citrate / lactate / sulphate / pyrophosphate or NaFeEDTA + Folic acid + Cyanocobalamine',
    mandatoryWarning: 'Label must carry: "People with Thalassemia may take under medical supervision". Optional: Zinc 10-15 mg/kg, Vit A, B1, B2, B3, B6.',
    fssaiSchedule: 'Schedule-I Clause 4',
    benefits: 'Eliminates iron-deficiency microcytic anemia and neural tube birth defects.',
  },
  {
    commodity: 'Fortified Maida (Refined Wheat Flour)',
    commodityHi: 'सुदृढ़ीकृत मैदा',
    category: 'Grain',
    fortificant: 'Iron + Folic Acid + Vitamin B12',
    level: 'Iron: 28 - 42.5 mg/kg; Folic Acid: 75 - 125 µg/kg; Vit B12: 0.75 - 1.25 µg/kg',
    sourceOfNutrient: 'Ferrous sulphate / Ferric pyrophosphate or NaFeEDTA + Cyanocobalamine',
    mandatoryWarning: 'Mandatory medical supervision declaration for Thalassemia patients.',
    fssaiSchedule: 'Schedule-I Clause 5',
    benefits: 'Enriches refined flour products (bakery, noodles, bread) with essential hematinics.',
  },
  {
    commodity: 'Fortified Fortified Raw Rice',
    commodityHi: 'सुदृढ़ीकृत चावल (FRK Blended)',
    category: 'Grain',
    fortificant: 'Iron + Folic Acid + Vitamin B12',
    level: 'Iron: 28 - 42.5 mg/kg (or NaFeEDTA: 14 - 21.25 mg/kg); Folic Acid: 75 - 125 µg/kg; Vit B12: 0.75 - 1.25 µg/kg',
    sourceOfNutrient: 'Ferric pyrophosphate or Sodium Iron (III) EDTA + Folic Acid + Cyanocobalamine',
    mandatoryWarning: 'Blended at 1:100 with normal milled rice for government public distribution (PDS) & mid-day meals.',
    fssaiSchedule: 'Schedule-I Clause 6',
    benefits: 'Mass staple nutrition delivery preventing maternal anemia and childhood stunting.',
  },
];

// -------------------------------------------------------------------------------
// 4. TOP BOTANICALS & NUTRACEUTICALS (SCHEDULE IV - FSSAI 2016)
// -------------------------------------------------------------------------------
export const BOTANICAL_NUTRACEUTICALS: BotanicalSupplement[] = [
  {
    sNo: 1,
    botanicalName: 'Emblica officinalis Gaertn. (Phyllanthus emblica)',
    commonName: 'Amla / Indian Gooseberry',
    commonNameHi: 'आंवला',
    partUsed: 'Fruit / Fresh Juice / Dry Powder / Extract',
    dailyAdultDose: 'Fresh fruit: 20-30 g | Powder: 3-6 g | Juice: 5-10 ml | Extract: 2-4 g',
    precautions: 'Extremely rich natural Vitamin C antioxidant. Safe for long term consumption.',
  },
  {
    sNo: 2,
    botanicalName: 'Withania somnifera (L.) Dunal',
    commonName: 'Ashwagandha / Indian Ginseng',
    commonNameHi: 'अश्वगंधा',
    partUsed: 'Root powder / Standardized Extract',
    dailyAdultDose: 'Root powder: 3-6 g | Extract: 0.5 - 1.0 g',
    precautions: 'Adaptogen; supports stress reduction and vigor. Not for pregnant women without advice.',
  },
  {
    sNo: 3,
    botanicalName: 'Ocimum sanctum L. (Ocimum tenuiflorum L.)',
    commonName: 'Tulsi / Holy Basil',
    commonNameHi: 'तुलसी',
    partUsed: 'Leaf / Seed / Extract',
    dailyAdultDose: 'Leaf: 2-5 g | Seed: 1-2 g | Juice: 3-6 ml',
    precautions: 'Antimicrobial, immunomodulator. Safe for daily wellness.',
  },
  {
    sNo: 4,
    botanicalName: 'Curcuma longa L.',
    commonName: 'Turmeric / Haldi',
    commonNameHi: 'हल्दी',
    partUsed: 'Rhizome powder / Fresh juice / Curcuminoids',
    dailyAdultDose: 'Powder: 2-5 g | Fresh juice: 5-10 ml | Curcumin extract: 250-500 mg',
    precautions: 'Curcuminoid min 2.0%. Must be free of lead chromate adulteration.',
  },
  {
    sNo: 5,
    botanicalName: 'Tinospora cordifolia (Willd.) Miers',
    commonName: 'Giloy / Guduchi',
    commonNameHi: 'गिलोय',
    partUsed: 'Stem / Root / Aqueous Extract (Sattva)',
    dailyAdultDose: 'Stem powder: 5-10 g | Decoction: 10-20 ml | Sattva extract: 400 mg max',
    precautions: 'Potent macrophage activator and antipyretic. Widely recognized in AYUSH/FSSAI.',
  },
  {
    sNo: 6,
    botanicalName: 'Zingiber officinale Roscoe',
    commonName: 'Ginger / Sonth / Adrak',
    commonNameHi: 'अदरक / सोंठ',
    partUsed: 'Rhizome (Fresh or Dried)',
    dailyAdultDose: 'Fresh: 5-10 g | Dry powder: 1-3 g',
    precautions: 'Caution: Excessive intake not recommended during acute hypertension or active bleeding disorders.',
  },
  {
    sNo: 7,
    botanicalName: 'Allium sativum L.',
    commonName: 'Garlic / Lahsun',
    commonNameHi: 'लहसुन',
    partUsed: 'Bulb / Dehydrated powder',
    dailyAdultDose: 'Bulb: 3-6 g | Powder: 1-2 g',
    precautions: 'Caution: High doses not recommended during late pregnancy or prior to surgery.',
  },
  {
    sNo: 8,
    botanicalName: 'Moringa oleifera Lam.',
    commonName: 'Drumstick / Sahjan / Moringa',
    commonNameHi: 'सहजन / मोरिंगा',
    partUsed: 'Leaves / Pods / Seeds / Stem bark',
    dailyAdultDose: 'Leaf paste: 10-20 g | Pods: 40-80 g | Bark powder: 2-5 g',
    precautions: 'Superfood profile: High iron, calcium, Vitamin A, and complete plant protein.',
  },
  {
    sNo: 9,
    botanicalName: 'Bacopa monnieri (L.) Wettst.',
    commonName: 'Brahmi',
    commonNameHi: 'ब्राह्मी',
    partUsed: 'Whole plant / Extract',
    dailyAdultDose: 'Powder: 5-10 g | Extract: 1-2 g',
    precautions: 'Supports cognitive neuro-protection and synaptic transmission.',
  },
  {
    sNo: 10,
    botanicalName: 'Asparagus racemosus Willd.',
    commonName: 'Shatavari',
    commonNameHi: 'शतावरी',
    partUsed: 'Tuberous root',
    dailyAdultDose: 'Root powder: 3-6 g | Fresh shoots: 20-50 g',
    precautions: 'Phytoestrogen support, galactagogue for lactating mothers.',
  },
  {
    sNo: 11,
    botanicalName: 'Azadirachta indica A. Juss.',
    commonName: 'Neem',
    commonNameHi: 'नीम',
    partUsed: 'Leaves / Flowers / Bark',
    dailyAdultDose: 'Leaf powder: 1-3 g | Flower: 2-4 g | Bark: 3-6 g',
    precautions: 'Caution: Not recommended for couples actively planning to conceive; avoid in children <5 yrs.',
  },
  {
    sNo: 12,
    botanicalName: 'Boswellia serrata Roxb.',
    commonName: 'Salai Guggul / Kundru',
    commonNameHi: 'सलाई गुग्गल',
    partUsed: 'Gum resin extract',
    dailyAdultDose: 'Extract: 250 - 1,500 mg/day (min 11-keto-beta boswellic acid)',
    precautions: 'Clinically proven anti-inflammatory for joint cartilage and osteo-health.',
  },
];

// -------------------------------------------------------------------------------
// 5. INS FOOD ADDITIVES & SWEETENERS / PRESERVATIVES DIRECTORY
// -------------------------------------------------------------------------------
export const KEY_INS_ADDITIVES: InsAdditive[] = [
  // Sweeteners
  { insNo: 'INS 950', name: 'Acesulfame Potassium', nameHi: 'एसेसल्फेम पोटेशियम', category: 'Artificial Sweetener', functionalClass: 'Sweetener, Flavour enhancer', maxPermittedLevel: 'Carbonated water: 300 ppm | Sweets: 500 ppm | Biscuits: 1000 ppm' },
  { insNo: 'INS 951', name: 'Aspartame', nameHi: 'एस्पार्टेम', category: 'Artificial Sweetener', functionalClass: 'Sweetener, Flavour enhancer', maxPermittedLevel: 'Carbonated water: 700 ppm | Sweets: 200 ppm | Confectionery: 10,000 ppm' },
  { insNo: 'INS 954', name: 'Saccharin Sodium', nameHi: 'सैकरिन सोडियम', category: 'Artificial Sweetener', functionalClass: 'Sweetener', maxPermittedLevel: 'Carbonated water: 100 ppm | Pan masala: 8000 ppm | Sweets: 500 ppm' },
  { insNo: 'INS 955', name: 'Sucralose', nameHi: 'सुक्रालोज़', category: 'Artificial Sweetener', functionalClass: 'Sweetener', maxPermittedLevel: 'Carbonated water: 300 ppm | Biscuits: 750 ppm | Ice Cream: 400 ppm' },
  { insNo: 'INS 961', name: 'Neotame', nameHi: 'नियोटेम', category: 'Artificial Sweetener', functionalClass: 'Sweetener', maxPermittedLevel: 'Carbonated water: 33 ppm max' },

  // Preservatives
  { insNo: 'INS 210', name: 'Benzoic Acid & Benzoates', nameHi: 'बेंज़ोइक एसिड व सोडियम बेंजोएट', category: 'Class II Preservative', functionalClass: 'Antimicrobial / Antifungal Preservative', maxPermittedLevel: 'Tomato sauce: 750 ppm | Fruit squashes: 600 ppm | Pickles: 250 ppm' },
  { insNo: 'INS 220', name: 'Sulphur Dioxide (SO₂)', nameHi: 'सल्फर डाइऑक्साइड', category: 'Class II Preservative', functionalClass: 'Preservative, Antioxidant, Bleaching', maxPermittedLevel: 'Dried fruits: 2000 ppm | Beer: 70 ppm | Wine: 450 ppm | Jam: 40 ppm' },
  { insNo: 'INS 200', name: 'Sorbic Acid & Sorbates', nameHi: 'सॉर्बिक एसिड व पोटेशियम सॉर्बेट', category: 'Class II Preservative', functionalClass: 'Mould & Yeast Inhibitor', maxPermittedLevel: 'Cheese: 3000 ppm | Baked foods: 1500 ppm | Paneer: 2000 ppm' },
  { insNo: 'INS 234', name: 'Nisin', nameHi: 'नाइसिन (एंटीमाइक्रोबियल पेप्टाइड)', category: 'Natural Preservative', functionalClass: 'Preservative for spore inhibition', maxPermittedLevel: 'Cheese: 12.5 ppm | Canned rasgulla: 5.0 ppm | Paneer: 12.5 ppm' },
  { insNo: 'INS 235', name: 'Natamycin (Pimaricin)', nameHi: 'नाटामैसिन', category: 'Surface Preservative', functionalClass: 'Surface antifungal for hard cheese', maxPermittedLevel: '2 mg/dm² surface treatment; penetration <= 2mm' },

  // Synthetic Colours (Max 100 ppm unless specified)
  { insNo: 'INS 102', name: 'Tartrazine (Food Yellow 4)', nameHi: 'टार्ट्राज़ीन (पीला रंग)', category: 'Synthetic Food Colour', functionalClass: 'Azo dye, bright yellow', maxPermittedLevel: '100 ppm max (200 ppm for canned cherries/strawberries)' },
  { insNo: 'INS 110', name: 'Sunset Yellow FCF', nameHi: 'सनसेट येलो', category: 'Synthetic Food Colour', functionalClass: 'Azo dye, orange-yellow', maxPermittedLevel: '100 ppm max in approved food list' },
  { insNo: 'INS 122', name: 'Carmoisine (Azorubine)', nameHi: 'कारमोइसिन (लाल रंग)', category: 'Synthetic Food Colour', functionalClass: 'Azo dye, reddish', maxPermittedLevel: '100 ppm max in approved confectionery/beverages' },
  { insNo: 'INS 124', name: 'Ponceau 4R', nameHi: 'पॉन्सो 4R', category: 'Synthetic Food Colour', functionalClass: 'Azo dye, deep red', maxPermittedLevel: '100 ppm max' },
  { insNo: 'INS 127', name: 'Erythrosine', nameHi: 'एरिथ्रोसिन', category: 'Synthetic Food Colour', functionalClass: 'Xanthene dye, cherry-pink', maxPermittedLevel: '100 ppm max' },
  { insNo: 'INS 132', name: 'Indigo Carmine', nameHi: 'इंडिगो कारमाइन (नीला रंग)', category: 'Synthetic Food Colour', functionalClass: 'Indigoid dye, blue', maxPermittedLevel: '100 ppm max' },
  { insNo: 'INS 133', name: 'Brilliant Blue FCF', nameHi: 'ब्रिलियंट ब्लू', category: 'Synthetic Food Colour', functionalClass: 'Triarylmethane dye, cyan-blue', maxPermittedLevel: '100 ppm max' },
  { insNo: 'INS 143', name: 'Fast Green FCF', nameHi: 'फास्ट ग्रीन', category: 'Synthetic Food Colour', functionalClass: 'Triarylmethane dye, sea green', maxPermittedLevel: '100 ppm max' },

  // Antioxidants & Emulsifiers
  { insNo: 'INS 320', name: 'Butylated Hydroxyanisole (BHA)', nameHi: 'बीएचए (BHA)', category: 'Synthetic Antioxidant', functionalClass: 'Fat rancidity retarder', maxPermittedLevel: 'Edible oils: 200 ppm | Ghee/Butter: 200 ppm | Chewing gum: 250 ppm' },
  { insNo: 'INS 319', name: 'Tertiary Butylhydroquinone (TBHQ)', nameHi: 'टीबीएचक्यू (TBHQ)', category: 'Synthetic Antioxidant', functionalClass: 'High-temperature frying antioxidant', maxPermittedLevel: 'Edible oils and fat spreads: 200 ppm max' },
  { insNo: 'INS 300', name: 'Ascorbic Acid (L-)', nameHi: 'एस्कॉर्बिक एसिड (विटामिन सी)', category: 'Antioxidant', functionalClass: 'Antioxidant, flour improver', maxPermittedLevel: 'GMP (Good Manufacturing Practices)' },
  { insNo: 'INS 322', name: 'Lecithins (Soya)', nameHi: 'लेसिथिन', category: 'Natural Emulsifier', functionalClass: 'Emulsifier, antioxidant synergist', maxPermittedLevel: 'GMP level across confectionery, chocolate & bakery' },
];

// -------------------------------------------------------------------------------
// 6. PROBIOTICS (SCHEDULE VII) & PREBIOTICS (SCHEDULE VIII)
// -------------------------------------------------------------------------------
export const APPROVED_PROBIOTICS = [
  'Lactobacillus acidophilus',
  'Lactobacillus plantarum',
  'Lactobacillus reuteri',
  'Lactobacillus rhamnosus',
  'Lactobacillus salivarius',
  'Lactobacillus casei',
  'Lactobacillus brevis',
  'Lactobacillus johnsonii',
  'Lactobacillus delbrueckii subsp. bulgaricus',
  'Bacillus coagulans',
  'Lactobacillus fermentum',
  'Lactobacillus caucasicus',
  'Lactobacillus helveticus',
  'Lactobacillus lactis',
  'Lactobacillus amylovorus',
  'Lactobacillus gallinarum',
  'Bifidobacterium bifidum',
  'Bifidobacterium lactis',
  'Bifidobacterium breve',
  'Bifidobacterium longum',
  'Bifidobacterium animalis',
  'Bifidobacterium infantis',
  'Streptococcus thermophilus',
  'Saccharomyces boulardii',
  'Saccharomyces cerevisiae',
  'Lactobacillus paracasei',
  'Lactobacillus gasseri',
];

export const APPROVED_PREBIOTICS = [
  { name: 'Polydextrose', source: 'Glucose polymer', function: 'Soluble prebiotic dietary fiber' },
  { name: 'Soybean oligosaccharides', source: 'Soybean extract', function: 'Bifidogenic stimulant' },
  { name: 'Isomalto-oligosaccharides (IMO)', source: 'Enzymatic starch hydrolysate', function: 'Digestive flora proliferation' },
  { name: 'Fructo-oligosaccharides (FOS)', source: 'Chicory inulin / sucrose', function: 'Short-chain fatty acid producer' },
  { name: 'Gluco-oligosaccharides', source: 'Fermentation oligosaccharide', function: 'Gut epithelial integrity' },
  { name: 'Xylo-oligosaccharides (XOS)', source: 'Corn cob / plant xylan', function: 'Ultra-low effective dose prebiotic' },
  { name: 'Inulin', source: 'Chicory roots (Cichorium intybus)', function: 'Long-chain fructan gut modulator' },
  { name: 'Isomaltulose', source: 'Sugar beet', function: 'Slow-release low glycemic prebiotic' },
  { name: 'Lactulose', source: 'Isomerized lactose', function: 'Clinically proven laxative and prebiotic' },
  { name: 'Lactoferrin', source: 'Milk whey protein fraction', function: 'Iron binding antimicrobial bioactive' },
  { name: 'Galacto-oligosaccharides (GOS)', source: 'Enzymatically treated lactose', function: 'Infant gut microbiome mimic' },
];
