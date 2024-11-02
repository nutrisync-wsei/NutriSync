import { CircumferenceType, CompositionType } from './types';

export const circumferenceTiles: {
  title: string;
  type: CircumferenceType;
}[] = [
  {
    title: 'Neck',
    type: 'neckCircumference',
  },
  {
    title: 'Shoulders',
    type: 'armCircumference',
  },
  {
    title: 'Chest',
    type: 'chestCircumference',
  },
  {
    title: 'Waist',
    type: 'waistCircumference',
  },
  {
    title: 'Hip',
    type: 'hipsCircumference',
  },
];

export const compositionItems: {
  title: string;
  type: CompositionType;
}[] = [
  {
    title: 'Muscle',
    type: 'muscle',
  },
  {
    title: 'Essential Fat',
    type: 'essentialFat',
  },
  {
    title: 'Storage Fat',
    type: 'storageFat',
  },
  {
    title: 'Bone',
    type: 'bone',
  },
  {
    title: 'Other',
    type: 'other',
  },
];
