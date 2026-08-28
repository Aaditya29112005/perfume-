export interface ProductNote {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: string;
  handle: string;
  number: string;
  name: string;
  frenchEcho: string;
  descriptor: string;
  category: 'boise' | 'oriental' | 'frais' | 'gourmand';
  notes: ProductNote;
  sceneGround: string;
  accentColor: string;
  price50ml: number;
  price100ml: number;
  bgImage: string;
  bottleImage50ml: string;
  bottleImage20ml: string;
  description: string;
  pyramidDetails: {
    topDetail: string;
    heartDetail: string;
    baseDetail: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'on-a-date',
    handle: 'on-a-date',
    number: 'ACCORD 01',
    name: 'ON A DATE',
    frenchEcho: "L'étincelle romantique",
    descriptor: 'WARM · AMBER · MUSK',
    category: 'boise',
    notes: {
      top: 'Calabrian Bergamot',
      heart: 'Golden Amber Resin',
      base: 'Cashmere Musk',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 185,
    price100ml: 260,
    bgImage: '/bg_on_a_date.jpg',
    bottleImage50ml: '/oad50.png',
    bottleImage20ml: '/oad20.png',
    description:
      'An evocative olfactory journey capturing the electric romance of a Paris evening. Bright Calabrian bergamot yields to an intoxicating heart of golden amber resin, anchored by velvety cashmere musk.',
    pyramidDetails: {
      topDetail: 'Hand-harvested sun-drenched Calabrian Bergamot citrus zest.',
      heartDetail: 'Aged golden amber resin extracted in traditional copper stills.',
      baseDetail: 'Velvety cashmere musk with subtle accords of warm vanilla.',
    },
  },
  {
    id: 'heritage-oud',
    handle: 'heritage-oud',
    number: 'ACCORD 02',
    name: "HÉRITAGE D'OUD",
    frenchEcho: "L'héritage d'Orient à Paris",
    descriptor: 'ASSAM OUD · CARDAMOM · CEDARWOOD',
    category: 'boise',
    notes: {
      top: 'Green Cardamom',
      heart: 'Atlas Cedarwood',
      base: 'Wild Assam Oud',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 190,
    price100ml: 270,
    bgImage: '/bg_heritage_oud.jpg',
    bottleImage50ml: '/hdo50.png',
    bottleImage20ml: '/hdo20.png',
    description:
      'The crown jewel of Haute Parfumerie. A majestic concentration of wild Assam oud enriched with crushed cardamom and sun-bleached Atlas cedarwood.',
    pyramidDetails: {
      topDetail: 'Green Guatemalan cardamom pods crushed under granite.',
      heartDetail: 'Centuries-old Atlas cedarwood heartwood.',
      baseDetail: 'First-press Assam oud resin harvested from wild trees.',
    },
  },
  {
    id: 'oud-rouge',
    handle: 'oud-rouge',
    number: 'ACCORD 03',
    name: 'OUD ROUGE',
    frenchEcho: "L'incendie écarlate",
    descriptor: 'RED SAFFRON · DAMASK ROSE · SMOKED OUD',
    category: 'oriental',
    notes: {
      top: 'Red Saffron',
      heart: 'Damask Rose',
      base: 'Smoked Oud',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 175,
    price100ml: 240,
    bgImage: '/bg_oud_rouge.jpg',
    bottleImage50ml: '/or50.png',
    bottleImage20ml: '/or20.png',
    description:
      'A fiery crimson composition of rare Persian saffron strands, May Rose petals, and charred agarwood resin.',
    pyramidDetails: {
      topDetail: 'First-harvest Persian red saffron threads.',
      heartDetail: 'Hand-picked May Rose Centifolia petals from Grasse.',
      baseDetail: 'Smoked Assam agarwood charred over fruitwood embers.',
    },
  },
  {
    id: 'prive-nuit',
    handle: 'prive-nuit',
    number: 'ACCORD 04',
    name: 'PRIVÉ NUIT',
    frenchEcho: 'Le secret de minuit',
    descriptor: 'MIDNIGHT PLUM · VELVET IRIS · BLACK AMBER',
    category: 'frais',
    notes: {
      top: 'Midnight Plum',
      heart: 'Velvet Iris',
      base: 'Black Amber',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 165,
    price100ml: 225,
    bgImage: '/bg_prive_nuit.jpg',
    bottleImage50ml: '/pn50.png',
    bottleImage20ml: '/pn20.png',
    description:
      'An enigmatic nocturnal elixir blending dark midnight plum, powdery Florentine iris root, and smoked black amber crystals.',
    pyramidDetails: {
      topDetail: 'Dark French midnight plum skin extract.',
      heartDetail: 'Aged Florentine violet iris root butter.',
      baseDetail: 'Rare Baltic black amber resin.',
    },
  },
  {
    id: 'tobacco-whiskey',
    handle: 'tobacco-whiskey',
    number: 'ACCORD 05',
    name: 'TOBACCO & WHISKEY',
    frenchEcho: "L'élixir des épicuriens",
    descriptor: 'BLONDE TOBACCO · VINTAGE MALT · BOURBON VANILLA',
    category: 'oriental',
    notes: {
      top: 'Blonde Tobacco',
      heart: 'Single Malt Whiskey',
      base: 'Bourbon Vanilla',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 170,
    price100ml: 230,
    bgImage: '/bg_tobacco_whiskey.jpg',
    bottleImage50ml: '/tw50.png',
    bottleImage20ml: '/tw20.png',
    description:
      'A hedonistic blend of cured Cuban tobacco leaves steeped in aged single malt whiskey. Finished with warm Madagascar bourbon vanilla.',
    pyramidDetails: {
      topDetail: 'Sun-cured blonde Cuban tobacco leaf absolute.',
      heartDetail: 'Aged Scottish Highland single malt whiskey accord.',
      baseDetail: 'Whole Madagascar bourbon vanilla beans and amber resin.',
    },
  },
  {
    id: 'tobacco-wine-vanilla',
    handle: 'tobacco-wine-vanilla',
    number: 'ACCORD 06',
    name: 'TOBACCO WINE VANILLA',
    frenchEcho: "L'ivresse des sens",
    descriptor: 'CURED TOBACCO · BORDEAUX WINE · BOURBON VANILLA',
    category: 'gourmand',
    notes: {
      top: 'Cured Tobacco',
      heart: 'Bordeaux Wine Accord',
      base: 'Bourbon Vanilla',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 180,
    price100ml: 255,
    bgImage: '/bg_tobacco_wine_vanilla.jpg',
    bottleImage50ml: '/twv50.png',
    bottleImage20ml: '/twv20.png',
    description:
      'An opulent gourmand masterpiece merging rich Bordeaux wine reduction with velvety cured tobacco and dark bourbon vanilla pods.',
    pyramidDetails: {
      topDetail: 'Aged Virginian cured tobacco leaves.',
      heartDetail: 'Rich French Bordeaux oak barrel wine reduction.',
      baseDetail: 'Dark Tahitian bourbon vanilla and tonka bean absolute.',
    },
  },
  {
    id: 'rose-wood-oud',
    handle: 'rose-wood-oud',
    number: 'ACCORD 07',
    name: 'ROSE WOOD OUD',
    frenchEcho: 'La rose sous les braises',
    descriptor: 'GRASSE ROSE · ROSEWOOD · AMBER OUD',
    category: 'frais',
    notes: {
      top: 'Grasse Rose Centifolia',
      heart: 'Brazilian Rosewood',
      base: 'Amber Oud',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 175,
    price100ml: 245,
    bgImage: '/bg_rose_wood_oud.jpg',
    bottleImage50ml: '/rwo50.png',
    bottleImage20ml: '/rwo20.png',
    description:
      'Freshly blooming May roses from Grasse draped over dark polished Brazilian rosewood and warm smoky amber oud.',
    pyramidDetails: {
      topDetail: 'Hand-picked May Rose Centifolia petals from Grasse fields.',
      heartDetail: 'Sustainable Brazilian rosewood with warm spicy facets.',
      baseDetail: 'Smoked amber resin and wild Cambodian oud.',
    },
  },
  {
    id: 'saffron-amber-oud',
    handle: 'saffron-amber-oud',
    number: 'ACCORD 08',
    name: 'SAFFRON AMBER OUD',
    frenchEcho: "L'or rouge d'Orient",
    descriptor: 'RED SAFFRON · GOLDEN AMBER · SMOKED OUD',
    category: 'boise',
    notes: {
      top: 'Red Saffron',
      heart: 'Golden Amber',
      base: 'Smoked Oud',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 195,
    price100ml: 275,
    bgImage: '/bg_saffron_amber_oud.jpg',
    bottleImage50ml: '/sao50.png',
    bottleImage20ml: '/sao20.png',
    description:
      'Luminous golden amber infused with rare Persian saffron and aged smoked oud. A scent of radiant luxury and timeless grandeur.',
    pyramidDetails: {
      topDetail: 'First-harvest Persian red saffron threads.',
      heartDetail: 'Golden fossilized amber resin.',
      baseDetail: 'Smoked Assam oud wood charred over fruitwood embers.',
    },
  },
  {
    id: 'leather-honey-musk',
    handle: 'leather-honey-musk',
    number: 'ACCORD 09',
    name: 'LEATHER HONEY MUSK',
    frenchEcho: 'La caresse cuivrée',
    descriptor: 'RAW LEATHER · WILD HONEY · CASHMERE MUSK',
    category: 'gourmand',
    notes: {
      top: 'Raw Tuscan Leather',
      heart: 'Wild Wildflower Honey',
      base: 'Cashmere Musk',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 205,
    price100ml: 290,
    bgImage: '/bg_saffron_amber_oud.jpg',
    bottleImage50ml: '/lhm50.png',
    bottleImage20ml: '/lhm20.png',
    description:
      'Sensual raw Tuscan leather softened by golden wildflower honey and wrapped in a cloud of velvety cashmere musk.',
    pyramidDetails: {
      topDetail: 'Hand-tanned Tuscan leather accord.',
      heartDetail: 'Raw Provençal wildflower honey nectar.',
      baseDetail: 'Velvety cashmere musk and white amber.',
    },
  },
  {
    id: 'intense-tobacco-floral',
    handle: 'intense-tobacco-floral',
    number: 'ACCORD 10',
    name: 'INTENSE TOBACCO FLORAL',
    frenchEcho: 'Le contraste mystique',
    descriptor: 'SMOKED TOBACCO · NIGHT JASMINE · DAMASK ROSE',
    category: 'oriental',
    notes: {
      top: 'Night Jasmine',
      heart: 'Smoked Cuban Tobacco',
      base: 'Damask Rose',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 215,
    price100ml: 300,
    bgImage: '/bg_tobacco_whiskey.jpg',
    bottleImage50ml: '/itf50.png',
    bottleImage20ml: '/itf20.png',
    description:
      'An intoxicating dual harmony of white night-blooming jasmine and smoked Cuban tobacco leaves resting on a bed of Damask rose.',
    pyramidDetails: {
      topDetail: 'Night-blooming royal white jasmine petals.',
      heartDetail: 'Charcoal-smoked Cuban cigar tobacco leaf.',
      baseDetail: 'Dark Damask rose oil and French oakmoss.',
    },
  },
  {
    id: 'leather-amber-tobacco',
    handle: 'leather-amber-tobacco',
    number: 'ACCORD 11',
    name: 'LEATHER AMBER TOBACCO',
    frenchEcho: 'La force séductrice',
    descriptor: 'BLACK LEATHER · AMBER RESIN · PIPE TOBACCO',
    category: 'oriental',
    notes: {
      top: 'Black Leather',
      heart: 'Amber Resin',
      base: 'Pipe Tobacco',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 225,
    price100ml: 315,
    bgImage: '/bg_oud_rouge.jpg',
    bottleImage50ml: '/lat50.png',
    bottleImage20ml: '/taw20.png',
    description:
      'A powerful triadic accord of black saddle leather, warm glowing amber resin, and rich aromatically aged pipe tobacco.',
    pyramidDetails: {
      topDetail: 'Black saddle leather infused with birch tar.',
      heartDetail: 'Glowing Baltic amber resin crystals.',
      baseDetail: 'Cherry-wood aged pipe tobacco leaves.',
    },
  },
  {
    id: 'cosmic-nuit-extrait',
    handle: 'cosmic-nuit-extrait',
    number: 'ACCORD 12',
    name: 'COSMIC NUIT EXTRAIT',
    frenchEcho: "L'étoile mystique",
    descriptor: 'INDIGO AMBER · COLD SPICES · OUD EXTRAIT',
    category: 'boise',
    notes: {
      top: 'Cold Cardamom & Pepper',
      heart: 'Indigo Amber',
      base: 'Oud Extrait',
    },
    sceneGround: '#0F1B3D',
    accentColor: '#C8102E',
    price50ml: 250,
    price100ml: 350,
    bgImage: '/bg_prive_nuit.jpg',
    bottleImage50ml: '/cn50.png',
    bottleImage20ml: '/cn50.png',
    description:
      'The ultimate Extrait de Parfum concentration. Icy cold spices dissolve into mysterious indigo amber and high-altitude wild oud.',
    pyramidDetails: {
      topDetail: 'Cryo-extracted cold cardamom and pink peppercorn.',
      heartDetail: 'Rare indigo ambergris and violet iris root.',
      baseDetail: 'High-altitude wild vintage oud oil.',
    },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}
