import { Subscription, UpcomingSubscription } from "@/type";
import dayjs from "dayjs";
import { icons } from "./icons";

export const tabs = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "subscription", title: "Subscription", icon: icons.subscription },
  { name: "insidhts", title: "Insights", icon: icons.insights },
  { name: "settings", title: "Settings", icon: icons.settings },
];

export const HOME_USER = {
  name: "Indrajith",
  date: dayjs().format("dddd, MMMM D, YYYY"),
  profilePic:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const HOME_BALANCE = {
  nextRenewal: dayjs().add(1, "month").format("MMMM D, YYYY"),
  currentBalance: 1234.56,
  totalBalance: 1234.56,
};

export const UPCOMING_SUBSCRIPTION: UpcomingSubscription[] = [
  {
    id: 1,
    name: "Apple Music",
    amount: "$10.99",
    date: dayjs().add(3, "day").format("MMMM D, YYYY"),
    icon: icons.appleMusic,
  },
  {
    id: 2,
    name: "Google",
    amount: "$1.99",
    date: dayjs().add(9, "day").format("MMMM D, YYYY"),
    icon: icons.google,
  },
  {
    id: 3,
    name: "Figma",
    amount: "$15.00",
    date: dayjs().add(12, "day").format("MMMM D, YYYY"),
    icon: icons.figma,
  },
  {
    id: 4,
    name: "Medium",
    amount: "$5.00",
    date: dayjs().add(15, "day").format("MMMM D, YYYY"),
    icon: icons.medium,
  },
];

export const HOME_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1,
    name: "Netflix",
    amount: "$10.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(10, "day").format("MMMM D, YYYY"),
    category: "Entertainment",
    icon: icons.netflix,
    status: "active",
  },
  {
    id: 2,
    name: "Spotify",
    amount: "$9.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(5, "day").format("MMMM D, YYYY"),
    category: "Music",
    icon: icons.spotify,
    status: "active",
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    amount: "$52.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(15, "day").format("MMMM D, YYYY"),
    category: "Productivity",
    icon: icons.adobe,
    status: "active",
  },
  {
    id: 4,
    name: "YouTube Premium",
    amount: "$11.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(20, "day").format("MMMM D, YYYY"),
    category: "Entertainment",
    icon: icons.youtube,
    status: "active",
  },
  {
    id: 5,
    name: "Amazon Prime",
    amount: "$14.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(25, "day").format("MMMM D, YYYY"),
    category: "Shopping",
    icon: icons.amazon,
    status: "active",
  },
  {
    id: 6,
    name: "Dropbox",
    amount: "$11.99",
    billingCycle: "Monthly",
    nextBilling: dayjs().add(12, "day").format("MMMM D, YYYY"),
    category: "Cloud Storage",
    icon: icons.dropbox,
    status: "active",
  },
];
