export const ALL_FORMS = [
  {title: 'Basic Details', screen: 'BasicDetails'},
  {title: 'Client & Firm Details', screen: 'ClientFirmScreen'},
  {title: 'Vendor Details', screen: 'VendorScreen'},
  {title: 'Visit Details', screen: 'VisitScreen'},
] as const;

export type ListItemProps = (typeof ALL_FORMS)[number];
