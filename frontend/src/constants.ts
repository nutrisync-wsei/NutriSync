import Icon from './assets/Icon';

export const menuItems = [
  { path: '/home', label: 'Home', Icon: Icon.Home },
  { path: '/diet', label: 'Diet', Icon: Icon.Scale },
  { path: '/profile', label: 'Profile', Icon: Icon.Profile },
];

export const settingsItems = [
  {
    path: '/profile-info',
    label: 'Personal information',
    Icon: Icon.SettingsProfile,
  },
  { path: '/profile', label: 'Subscription', Icon: Icon.Subscription },
  {
    path: '/notifications',
    label: 'Notifications',
    Icon: Icon.Notifications,
  },
  { path: '/profile', label: 'About', Icon: Icon.About },
  {
    path: '/profile',
    label: 'Support',
    Icon: Icon.Support,
  },
  { path: '/logout', label: 'Logout', Icon: Icon.Logout },
];
