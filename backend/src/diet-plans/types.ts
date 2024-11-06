interface IRange {
  min?: number
  max?: number
}

interface IPredicate {
  all?: IPredicate[]
  any?: IPredicate[]
  not?: IPredicate
  when?: {
    condition: IPredicate
    require: IPredicate
  }
  health?: string[]
  diet?: string[]
  caution?: string[]
  cuisine?: string[]
  meal?: string[]
  dish?: string[]
  onlyDish?: string[]
  source?: string[]
  sourceName?: string[]
}

interface IDietPlanSection {
  accept?: IPredicate
  fit?: Record<string, IRange>
  exclude?: string[]
  sections?: Record<string, IDietPlanSection>
}

interface ILinkEntry {
  title?: string
  href: string
}

interface ISelection {
  assigned?: string
  _links?: {
    self: ILinkEntry
  }
  sections?: Record<string, ISelection>
}

export interface IDietPlanRequest {
  size: number
  plan: IDietPlanSection
}

type DietPlanStatus = 'OK' | 'INCOMPLETE' | 'TIME_OUT'

export interface IDietPlanResponse {
  status: DietPlanStatus
  _links?: Record<string, ILinkEntry>
  selection: ISelection[]
}

export interface IIngredient {
  text: string
  quantity: number
  measure: string
  food: string
  weight: number
  foodId: string
}

export interface INutrientInfo {
  label: string
  quantity: number
  unit: string
}

export interface INutrientsInfo {
  [key: string]: INutrientInfo
}

export interface IDigestEntry {
  label: string
  tag: string
  schemaOrgTag: string
  total: number
  hasRDI: boolean
  daily: number
  unit: string
  sub?: IDigestEntry[]
}

export interface IImageInfo {
  url: string
  width: number
  height: number
}

export interface IRecipe {
  uri: string
  label: string
  image: string
  images: {
    THUMBNAIL?: IImageInfo
    SMALL?: IImageInfo
    REGULAR?: IImageInfo
    LARGE?: IImageInfo
  }
  source: string
  url: string
  shareAs: string
  yield: number
  dietLabels: string[]
  healthLabels: string[]
  cautions: string[]
  ingredientLines: string[]
  ingredients: IIngredient[]
  calories: number
  glycemicIndex: number
  inflammatoryIndex: number
  totalCO2Emissions: number
  co2EmissionsClass: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  totalWeight: number
  totalTime: number
  cuisineType: string[]
  mealType: string[]
  dishType: string[]
  instructions: string[]
  tags: string[]
  externalId: string
  totalNutrients: INutrientsInfo
  totalDaily: INutrientsInfo
  digest: IDigestEntry[]
}

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  BRUNCH = 'BRUNCH',
  LUNCH = 'LUNCH',
  SNACK = 'SNACK',
  TEATIME = 'TEATIME'
}

export enum WeekDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export type Meal = {
  type: MealType
  name: string
  ingredients: string[]
  description: string
  calories: number
}

export enum HealthLabel {
  FAT_FREE = 'fat-free',
  LOW_FAT_ABS = 'low-fat-abs',
  SUGAR_CONSCIOUS = 'sugar-conscious',
  LOW_SUGAR = 'low-sugar',
  LOW_POTASSIUM = 'low-potassium',
  KIDNEY_FRIENDLY = 'kidney-friendly',
  KETO_FRIENDLY = 'keto-friendly',
  PLANT_BASED = 'plant-based',
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarian',
  PESCATARIAN = 'pescatarian',
  PALEO = 'paleo',
  SPECIFIC_CARBS = 'specific-carbs',
  MEDITERRANEAN = 'Mediterranean',
  DASH = 'DASH',
  DAIRY_FREE = 'dairy-free',
  GLUTEN_FREE = 'gluten-free',
  WHEAT_FREE = 'wheat-free',
  EGG_FREE = 'egg-free',
  MILK_FREE = 'milk-free',
  PEANUT_FREE = 'peanut-free',
  TREE_NUT_FREE = 'tree-nut-free',
  SOY_FREE = 'soy-free',
  FISH_FREE = 'fish-free',
  SHELLFISH_FREE = 'shellfish-free',
  PORK_FREE = 'pork-free',
  RED_MEAT_FREE = 'red-meat-free',
  CRUSTACEAN_FREE = 'crustacean-free',
  CELERY_FREE = 'celery-free',
  MUSTARD_FREE = 'mustard-free',
  SESAME_FREE = 'sesame-free',
  LUPINE_FREE = 'lupine-free',
  MOLLUSK_FREE = 'mollusk-free',
  ALCOHOL_FREE = 'alcohol-free',
  NO_OIL_ADDED = 'no-oil-added',
  NO_SUGAR_ADDED = 'no-sugar-added',
  SULFITE_FREE = 'sulfite-free',
  FODMAP_FREE = 'fodmap-free',
  KOSHER = 'kosher',
  ALCOHOL_COCKTAIL = 'alcohol-cocktail',
  IMMUNO_SUPPORTIVE = 'immuno-supportive'
}
