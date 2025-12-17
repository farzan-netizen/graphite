export enum IndustryId {
  B2B_SAAS = 'B2B_SAAS',
  COMPUTER_SOFTWARE = 'COMPUTER_SOFTWARE',
  TECHNOLOGY_AND_SERVICES = 'TECHNOLOGY_AND_SERVICES',
  AI = 'AI',
  MEDICAL_SAAS = 'MEDICAL_SAAS',
  MAR_TECH = 'MAR_TECH',
  AD_TECH = 'AD_TECH',
  ONLINE_MARKETPLACE = 'ONLINE_MARKETPLACE',
  ED_TECH = 'ED_TECH',
  DEV_TOOLS = 'DEV_TOOLS',
  OTHER = 'OTHER',
  // Other industries
  ADULT = 'ADULT',
  ARTS_AND_ENTERTAINMENT = 'ARTS_AND_ENTERTAINMENT',
  BUSINESS_AND_CONSUMER_SERVICES = 'BUSINESS_AND_CONSUMER_SERVICES',
  COMMUNITY_AND_SOCIETY = 'COMMUNITY_AND_SOCIETY',
  COMPUTERS_ELECTRONICS_AND_TECHNOLOGY = 'COMPUTERS_ELECTRONICS_AND_TECHNOLOGY',
  E_COMMERCE_AND_SHOPPING = 'E_COMMERCE_AND_SHOPPING',
  FINANCE = 'FINANCE',
  FOOD_AND_DRINK = 'FOOD_AND_DRINK',
  GAMBLING = 'GAMBLING',
  GAMES = 'GAMES',
  HEALTH = 'HEALTH',
  HEAVY_INDUSTRY_AND_ENGINEERING = 'HEAVY_INDUSTRY_AND_ENGINEERING',
  HOBBIES_AND_LEISURE = 'HOBBIES_AND_LEISURE',
  HOME_AND_GARDEN = 'HOME_AND_GARDEN',
  JOBS_AND_CAREER = 'JOBS_AND_CAREER',
  LAW_AND_GOVERNMENT = 'LAW_AND_GOVERNMENT',
  LIFESTYLE = 'LIFESTYLE',
  LUXURY = 'LUXURY',
  NEWS_AND_MEDIA = 'NEWS_AND_MEDIA',
  PETS_AND_ANIMALS = 'PETS_AND_ANIMALS',
  REFERENCE_MATERIALS = 'REFERENCE_MATERIALS',
  SCIENCE_AND_EDUCATION = 'SCIENCE_AND_EDUCATION',
  SPORTS = 'SPORTS',
  TRAVEL_AND_TOURISM = 'TRAVEL_AND_TOURISM',
  VEHICLES = 'VEHICLES',
}

export const INDUSTRIES_MAPPING = {
  [IndustryId.B2B_SAAS]: { id: IndustryId.B2B_SAAS, name: 'B2B SaaS' },
  [IndustryId.COMPUTER_SOFTWARE]: {
    id: IndustryId.COMPUTER_SOFTWARE,
    name: 'Computer Software',
  },
  [IndustryId.TECHNOLOGY_AND_SERVICES]: {
    id: IndustryId.TECHNOLOGY_AND_SERVICES,
    name: 'Technology and Services',
  },
  [IndustryId.AI]: { id: IndustryId.AI, name: 'AI' },
  [IndustryId.MEDICAL_SAAS]: {
    id: IndustryId.MEDICAL_SAAS,
    name: 'Medical SaaS',
  },
  [IndustryId.MAR_TECH]: { id: IndustryId.MAR_TECH, name: 'MarTech' },
  [IndustryId.AD_TECH]: { id: IndustryId.AD_TECH, name: 'AdTech' },
  [IndustryId.ONLINE_MARKETPLACE]: {
    id: IndustryId.ONLINE_MARKETPLACE,
    name: 'Online Marketplace',
  },
  [IndustryId.ED_TECH]: { id: IndustryId.ED_TECH, name: 'EdTech' },
  [IndustryId.DEV_TOOLS]: { id: IndustryId.DEV_TOOLS, name: 'Dev Tools' },
  [IndustryId.OTHER]: { id: IndustryId.OTHER, name: 'Other' },
}

export const INDUSTRIES_ITEMS = Object.values(INDUSTRIES_MAPPING)

export const OTHER_INDUSTRIES_MAPPING = {
  [IndustryId.ADULT]: {
    id: IndustryId.ADULT,
    name: 'Adult',
  },
  [IndustryId.ARTS_AND_ENTERTAINMENT]: {
    id: IndustryId.ARTS_AND_ENTERTAINMENT,
    name: 'Arts and Entertainment',
  },
  [IndustryId.BUSINESS_AND_CONSUMER_SERVICES]: {
    id: IndustryId.BUSINESS_AND_CONSUMER_SERVICES,
    name: 'Business and Consumer Services',
  },
  [IndustryId.COMMUNITY_AND_SOCIETY]: {
    id: IndustryId.COMMUNITY_AND_SOCIETY,
    name: 'Community and Society',
  },
  [IndustryId.COMPUTERS_ELECTRONICS_AND_TECHNOLOGY]: {
    id: IndustryId.COMPUTERS_ELECTRONICS_AND_TECHNOLOGY,
    name: 'Computers Electronics and Technology',
  },
  [IndustryId.E_COMMERCE_AND_SHOPPING]: {
    id: IndustryId.E_COMMERCE_AND_SHOPPING,
    name: 'E-commerce and Shopping',
  },
  [IndustryId.FINANCE]: {
    id: IndustryId.FINANCE,
    name: 'Finance',
  },
  [IndustryId.FOOD_AND_DRINK]: {
    id: IndustryId.FOOD_AND_DRINK,
    name: 'Food and Drink',
  },
  [IndustryId.GAMBLING]: {
    id: IndustryId.GAMBLING,
    name: 'Gambling',
  },
  [IndustryId.GAMES]: {
    id: IndustryId.GAMES,
    name: 'Games',
  },
  [IndustryId.HEALTH]: {
    id: IndustryId.HEALTH,
    name: 'Health',
  },
  [IndustryId.HEAVY_INDUSTRY_AND_ENGINEERING]: {
    id: IndustryId.HEAVY_INDUSTRY_AND_ENGINEERING,
    name: 'Heavy Industry and Engineering',
  },
  [IndustryId.HOBBIES_AND_LEISURE]: {
    id: IndustryId.HOBBIES_AND_LEISURE,
    name: 'Hobbies and Leisure',
  },
  [IndustryId.HOME_AND_GARDEN]: {
    id: IndustryId.HOME_AND_GARDEN,
    name: 'Home and Garden',
  },
  [IndustryId.JOBS_AND_CAREER]: {
    id: IndustryId.JOBS_AND_CAREER,
    name: 'Jobs and Career',
  },
  [IndustryId.LAW_AND_GOVERNMENT]: {
    id: IndustryId.LAW_AND_GOVERNMENT,
    name: 'Law and Government',
  },
  [IndustryId.LIFESTYLE]: {
    id: IndustryId.LIFESTYLE,
    name: 'Lifestyle',
  },
  [IndustryId.LUXURY]: {
    id: IndustryId.LUXURY,
    name: 'Luxury',
  },
  [IndustryId.NEWS_AND_MEDIA]: {
    id: IndustryId.NEWS_AND_MEDIA,
    name: 'News and Media',
  },
  [IndustryId.PETS_AND_ANIMALS]: {
    id: IndustryId.PETS_AND_ANIMALS,
    name: 'Pets and Animals',
  },
  [IndustryId.REFERENCE_MATERIALS]: {
    id: IndustryId.REFERENCE_MATERIALS,
    name: 'Reference Materials',
  },
  [IndustryId.SCIENCE_AND_EDUCATION]: {
    id: IndustryId.SCIENCE_AND_EDUCATION,
    name: 'Science and Education',
  },
  [IndustryId.SPORTS]: {
    id: IndustryId.SPORTS,
    name: 'Sports',
  },
  [IndustryId.TRAVEL_AND_TOURISM]: {
    id: IndustryId.TRAVEL_AND_TOURISM,
    name: 'Travel and Tourism',
  },
  [IndustryId.VEHICLES]: {
    id: IndustryId.VEHICLES,
    name: 'Vehicles',
  },
}
export const OTHER_INDUSTRIES_ITEMS = Object.values(OTHER_INDUSTRIES_MAPPING)
  .map(({ id, name }) => ({
    id,
    label: name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))
