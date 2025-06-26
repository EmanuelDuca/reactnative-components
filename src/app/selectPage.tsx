import { Badge, BadgeText, Text } from "@usekeyhole/nativewind";
import { View } from "react-native";
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectGroupHeading,
  SelectInput,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";

export default function Page() {
  return <Content />;
}

type Address = {
  key: string;
  value: string;
  address: string;
};

function Content() {
  return (
    <View className="flex-1">
      <View className="p-10">
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select something" />
            </SelectTrigger>
            <SelectContent align="start" className="w-[300px]">
              <SelectInput placeholder="Type a command or search..." />
              <SelectList>
                <SelectEmpty>No address found.</SelectEmpty>
                <SelectGroup
                  heading={
                    <>
                      <ExperimentalHeading />
                      {/* <View className="flex flex-row ml-[-26px] gap-2">
                        <Badge size={"small"}>
                          <BadgeText>Admin</BadgeText>
                        </Badge>
                        <Text className="border-red-100  text-sm font-semibold italic">
                          New Text Component
                        </Text>
                      </View> */}
                    </>
                  }
                >
                  {addresses.map((address) => (
                    <SelectItem
                      className="font-normal"
                      key={address.key}
                      value={address.address}
                    >
                      <Text>{address.address}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup
                  heading={
                    <>
                      <ExperimentalHeading />
                      {/* <View className="flex flex-row ml-[-26px] gap-2">
                      <Badge size={"small"}>
                        <BadgeText>Admin</BadgeText>
                      </Badge>
                      <Text className="border-red-100  text-sm font-semibold italic">
                        New Text Component
                      </Text>
                    </View> */}
                    </>
                  }
                >
                  {addresses.map((address) => (
                    <SelectItem
                      className="font-normal"
                      key={address.key}
                      value={address.address}
                    >
                      <Text>{address.address}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectList>
            </SelectContent>
          </Select>
        </View>
      </View>
    </View>
  );
}

const ExperimentalHeading = () => {
  return <SelectGroupHeading>45 Business Park</SelectGroupHeading>;
};

const addresses: Address[] = [
  {
    key: "addr-001",
    value: "home",
    address: "123 Main St, Copenhagen, Denmark",
  },
  {
    key: "addr-002",
    value: "office",
    address: "45 Business Park, Aarhus, Denmark",
  },
  {
    key: "addr-003",
    value: "summerhouse",
    address: "78 Beachside Rd, Odense, Denmark",
  },
  {
    key: "addr-004",
    value: "parents",
    address: "12 Family Ln, Aalborg, Denmark",
  },
  {
    key: "addr-005",
    value: "warehouse",
    address: "300 Industrial Ave, Esbjerg, Denmark",
  },
];
