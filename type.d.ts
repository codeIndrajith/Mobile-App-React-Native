import type { ImageSourcePropType } from "react-native";

declare global {
  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
  }
}

export interface UpcomingSubscription {
  id: number;
  name: string;
  amount: string;
  date: string;
  icon: ImageSourcePropType;
}

export interface Subscription {
  id: number;
  name: string;
  amount: string;
  billingCycle: string;
  nextBilling: string;
  category: string;
  icon: ImageSourcePropType;
  status: string;
}
