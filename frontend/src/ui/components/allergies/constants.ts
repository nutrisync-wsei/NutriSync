import { Allergy } from './types';

export const allergiesList: {
  value: Allergy;
  label: string;
}[] = [
  { value: 'celery-free', label: 'Celery Free' },
  { value: 'crustacean-free', label: 'Crustacean Free' },
  { value: 'dairy-free', label: 'Dairy Free' },
  { value: 'egg-free', label: 'Egg Free' },
  { value: 'fish-free', label: 'Fish Free' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'lupine-free', label: 'Lupine Free' },
  { value: 'mustard-free', label: 'Mustard Free' },
  { value: 'peanut-free', label: 'Peanut Free' },
  { value: 'sesame-free', label: 'Sesame Free' },
  { value: 'shellfish-free', label: 'Shellfish Free' },
  { value: 'soy-free', label: 'Soy Free' },
  { value: 'tree-nut-free', label: 'Tree Nut Free' },
  { value: 'wheat-free', label: 'Wheat Free' },
  { value: 'fodmap-free', label: 'FODMAP Free' },
  { value: 'immuno-supportive', label: 'Immuno Supportive' },
];
