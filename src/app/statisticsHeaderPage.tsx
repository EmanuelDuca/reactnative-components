import { Stat, StatLabel, StatNumber } from "@/components/stat-group/stat";
import {
  StatGroup,
  StatGroupContent,
  StatGroupItem,
  StatGroupRow,
  StatGroupTitle,
} from "@/components/stat-group/stat-group";
import * as React from "react";
import { Text, View } from "react-native";

export default function Page() {
  return <Content />;
}

function Content() {
  return (
    <View className="flex-1 bg-white dark:bg-black p-5 ">
      <View className="flex flex-row">
        <Stat>
          <StatLabel>Total Properties</StatLabel>
          <StatNumber>47</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Rental Properties</StatLabel>
          <StatNumber>432</StatNumber>
        </Stat>
      </View>
      <View className="h-60">
        <StatGroup>
          <StatGroupTitle>Properties</StatGroupTitle>
          <StatGroupContent>
            <StatGroupRow>
              <StatGroupItem>
                <StatLabel>Total Properties</StatLabel>
                <StatNumber>47</StatNumber>
              </StatGroupItem>
              <StatGroupItem>
                <StatLabel>Rental Properties</StatLabel>
                <StatNumber>432</StatNumber>
              </StatGroupItem>
            </StatGroupRow>
            <StatGroupRow>
              <StatGroupItem>
                <StatLabel>Total Properties</StatLabel>
                <StatNumber>47</StatNumber>
              </StatGroupItem>
              <StatGroupItem>
                <StatLabel>Rental Properties</StatLabel>
                <StatNumber>432</StatNumber>
              </StatGroupItem>
            </StatGroupRow>
          </StatGroupContent>
        </StatGroup>
      </View>
    </View>
  );
}
