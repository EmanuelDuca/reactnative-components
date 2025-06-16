import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  Badge,
  BadgeText,
  Details,
  DetailsList,
  DetailsItem,
  DetailsLabel,
  DetailsValue,
  DetailsLabelText,
  DetailsValueText,
  CardFooter,
  Button,
  ButtonText,
  DetailsTitle,
} from "@usekeyhole/nativewind";
import { View, Text } from "react-native";

export function LeaseProductWidgetDemo() {
  return (
    <View>
      <Card className="gap-2 rounded-2xl bg-background p-2">
        <Card className="bg-accent border-0">
          <CardContent className="p-6">
            <Badge variant="yellow" className="mb-6">
              <BadgeText>Move-out claim</BadgeText>
            </Badge>
            <View className="flex-row items-center gap-4">
              <View className="size-12 bg-gray-300 rounded-full justify-center items-center">
                <Text>✓</Text> {/* Simple icon placeholder */}
              </View>
              <View>
                <CardDescription className="font-semibold text-accent-foreground">
                  Keyhole Deposit
                </CardDescription>
                <CardTitle className="text-base text-foreground">
                  Open ended Guarantee
                </CardTitle>
              </View>
            </View>
            <Details className="mt-6">
              <DetailsList>
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>Move-in</DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>17. January 2024</DetailsValueText>
                  </DetailsValue>
                </DetailsItem>
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>Guarantee ends</DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>-</DetailsValueText>
                  </DetailsValue>
                </DetailsItem>
              </DetailsList>
            </Details>
          </CardContent>
        </Card>
        <CardContent className="mt-6">
          <Details>
            <DetailsTitle className="mb-3">
              <DetailsLabelText className="text-sm">
                Lease conditions
              </DetailsLabelText>
            </DetailsTitle>
            <DetailsList>
              <DetailsItem>
                <DetailsLabel>
                  <DetailsLabelText>Deposit (1 month)</DetailsLabelText>
                </DetailsLabel>
                <DetailsValue>
                  <DetailsValueText>7,500 DKK</DetailsValueText>
                </DetailsValue>
              </DetailsItem>
              <DetailsItem>
                <DetailsLabel>
                  <DetailsLabelText>Prepaid rent (2 months)</DetailsLabelText>
                </DetailsLabel>
                <DetailsValue>
                  <DetailsValueText>15,000 DKK</DetailsValueText>
                </DetailsValue>
              </DetailsItem>
              <DetailsItem>
                <DetailsLabel>
                  <DetailsLabelText>Rent</DetailsLabelText>
                </DetailsLabel>
                <DetailsValue>
                  <DetailsValueText>7,500 DKK</DetailsValueText>
                </DetailsValue>
              </DetailsItem>
            </DetailsList>
          </Details>
        </CardContent>
        <CardFooter>
          <View className="w-full flex-row gap-4">
            <Button className="flex-1" color="brand-soft" onPress={() => {}}>
              <ButtonText className="text-foreground dark:text-foreground">
                View claim
              </ButtonText>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
