import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxDescription,
  CheckboxContent,
} from "@/components/checkbox/checkbox";
import { Popover } from "@usekeyhole/web";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonText,
  Star,
} from "@usekeyhole/nativewind";
import { Link } from "expo-router";
import * as React from "react";
import { Text, View } from "react-native";
/* import { Table } from "@/components/table"; */

export default function Page() {
  return (
    <View className="flex flex-1 bg-white">
      <Content />
    </View>
  );
}

function Content() {
  // const options = useGuaranteeStatusFilters();
  // const [columnFilters, setColumnFilters] = React.useState<any>([]);

  return (
    <View className="flex-1 dark:bg-black">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <View className="gap-4">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Go to first page
              </Link>
            </View>

            <View className="gap-6">
              <Badge size="small" variant="secondary">
                <BadgeText>Badge</BadgeText>
                <BadgeIcon>
                  <Star />
                </BadgeIcon>
              </Badge>
            </View>
            <View className="gap-6 flex flex-row">
              <View className="gap-6">{/* <Table></Table> */}</View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// export const GUARANTEE_STATES = [
//   "Inactive",
//   "Closed",
//   "Active",
//   "MovingOut",
//   "Onboarding",
// ] as const;

// export const getStatusTextAndColor = (status: string) => {
//   switch (status) {
//     case "Active":
//       return {
//         color: "red",
//         text: "status_pill_active",
//       };

//     case "Inactive":
//       return {
//         color: "darkGrey",
//         text: "-",
//       };

//     case "MovingOut":
//       return {
//         color: "green50",
//         text: "label_move_out_claim",
//       };

//     case "Onboarding":
//       return {
//         color: "paragraph",
//         text: "status_pill_onboarding",
//       };

//     case "Closed":
//       return {
//         color: "green",
//         text: "label_closed",
//       };

//     // - dispute
//     default:
//       return {
//         color: "darkGrey",
//         text: status,
//       };
//   }
// };

// const useGuaranteeStatusFilters = () => {
//   return GUARANTEE_STATES.map<{
//     label: string;
//     value: any;
//     icon: React.FC;
//   }>((state) => {
//     const { text, color } = getStatusTextAndColor(state);
//     return {
//       label: text,
//       value: state,
//     };
//   })
//     .filter((filter) => filter.label !== "-")
//     .sort((a, b) => a.label.localeCompare(b.label));
// };

// This is just for the list.
export const demoList = [
  {
    name: "onBoarding",
    id: "321-432-431",
    BadgeInfo: {
      size: "small",
      variant: "green",
    },
  },
  {
    name: "Active",
    id: "321-432-432",
    BadgeInfo: {
      size: "small",
      variant: "default",
    },
  },
  {
    name: "Move-Out Claim",
    id: "321-432-433",
    BadgeInfo: {
      size: "small",
      variant: "yellow",
    },
  },
  {
    name: "Tentant amendment",
    id: "321-432-434",
    BadgeInfo: {
      size: "small",
      variant: "green",
    },
  },
];
