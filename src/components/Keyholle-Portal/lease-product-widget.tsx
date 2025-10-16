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
  DetailsTitleText,
  BadgeProps,
  ButtonIcon,
  LoaderCircle,
  toast,
  Skeleton,
  Vault,
  Tabs,
  TabsList,
  TabsTrigger,
  GlobeQuestion,
  CountryFlag,
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@usekeyhole/nativewind";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  TCountryCode,
} from "@usekeyhole/web";
import { cn } from "@usekeyhole/utils";
import React from "react";
import { useLocalizationContext } from "~/contexts/LocalizationContext";
import { useRouterContext } from "~/contexts/RouterContext/RouterContext";
import { useOrganization, useRole } from "~/hooks/profile-store";
import { useProductTypeInfo } from "~/hooks/use-products-info";
import { TenantGroupInterface } from "~/interfaces/TenantGroupInterface";
import { getMonthsText } from "~/utils/utils";
import { useDeleteInvitationMutation } from "~/hooks/api/invitations";
import { useDeleteDepositNorwayInvitationMutation } from "~/hooks/api/invitations-norway";
import { RentalInterface } from "~/interfaces/RentalInterface";
import dayjs from "dayjs";
import { InitiateMoveOutDialog } from "~/nativewind/forms/initiate-move-out-form/initiate-move-out-dialog";
import {
  OnboardingStep,
  ProductOnboardingsStateResponse,
  ProductType,
} from "~/api/products";
import { View } from "react-native";
import { Currency } from "~/api/helpers/types";
import { SecureResponse } from "~/api/secure";
import { useDeleteSecureInvitationMutation } from "~/hooks/api/secure";
import { useRouter } from "expo-router";
import { isPermitted } from "~/utils/helpers";
import {
  CardWidget,
  CardWidgetContent,
  CardWidgetHeader,
  CardWidgetHeaderContent,
  CardWidgetProduct,
  CardWidgetSection,
} from "~/nativewind/components/card-widget/card-widget";

import { LeaseTenantOnboardingSteps } from "./lease-tenant-onboarding-steps";

export const getProductWidgetState = (
  status: TenantGroupInterface["status"] | SecureResponse["state"]
): ProductData["state"] | null => {
  switch (status) {
    case "Onboarding":
    case "AwaitingRentalContract":
    case "AwaitingGuarantee":
    case "AwaitingTenantTransfer":
    case "AwaitingFinancialReview":
      return "Onboarding";
    case "Active":
    case "AmendmentTenantMoveIn":
    case "AmendmentTenantSwap":
    case "AmendmentTenantMoveOut":
    case "AmendmentRentRegulation":
      return "Active";
    case "MovingOut":
      return "MovingOut";
    default:
      return null;
  }
};

type ProductData = {
  state: "Onboarding" | "Active" | "MovingOut";
  rentalFee: number;
  depositMonths: number;
  prepaidMonths?: number;
  moveInDate: Date;
  claimId?: string;
  // in norway this is id of the deposit/tenantGroup (based on legacy code)
  invitationId: string;
  rental: RentalInterface;
  tenantGroupId: string;
  productOnboardings: ProductOnboardingsStateResponse;
};

type DepositProductProps = {
  product: "deposit";
  data: ProductData & {
    endDate?: Date;
  };
};

type SecureProductProps = {
  product: "secure";
  data: ProductData & {
    moveOutDate?: Date;
    depositedAmount: Currency;
    interestRate: number;
  };
};

export type LeaseProductWidgetProps = DepositProductProps | SecureProductProps;

export const getWidgetProductType = (productType: ProductType) => {
  switch (productType) {
    case "KeyholeSecure":
      return "secure";
    default:
      return "deposit";
  }
};

export function LeaseProductWidget({ product, data }: LeaseProductWidgetProps) {
  const role = useRole();
  const router = useRouterContext();
  const { t, formatNumber } = useLocalizationContext();
  const [activeTab, setActiveTab] = React.useState<string>("agreement");
  const organization = useOrganization();
  const isNorway = organization.locale === "no";

  const productType = React.useMemo<ProductType>(() => {
    if (product === "secure") return "KeyholeSecure";
    if (product === "deposit") {
      if (!!data.endDate && isNorway) return "DepositNorwayFixed";
      if (!data.endDate && isNorway) return "DepositNorwayOpen";
      return "Deposit";
    }
    return "Unknown";
  }, [product, data, isNorway]);

  const {
    Icon: ProductIcon,
    title: productTitle,
    subtitle: productSubtitle,
  } = useProductTypeInfo(productType);

  const stateVariants = {
    Onboarding: {
      badgeText: t("label_onboarding"),
      badgeVariant: "green",
    },
    Active: {
      badgeText: t("label_active"),
      badgeVariant: "default",
    },
    MovingOut: {
      badgeText: t("label_move_out_claim"),
      badgeVariant: "yellow",
    },
  } as const satisfies Record<
    typeof data.state,
    {
      badgeText: string;
      badgeVariant: BadgeProps["variant"];
    }
  >;

  const variant = stateVariants[data.state];
  const isOnboarding = ["Onboarding"].includes(data.state);

  const onTabChange = React.useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <CardWidget>
      <CardWidgetHeader
        className={cn(
          "border-0 pb-6",
          isOnboarding ? "bg-primary-soft" : "bg-accent"
        )}
      >
        <CardWidgetHeaderContent>
          <Badge variant={variant.badgeVariant} className="">
            <BadgeText>{variant.badgeText}</BadgeText>
          </Badge>
          <CardWidgetProduct
            className="mt-2"
            Icon={Vault}
            title={productTitle}
            subtitle={productSubtitle}
          />

          <Details className="mt-6">
            <DetailsList>
              <DetailsItem>
                <DetailsLabel>
                  <DetailsLabelText>{t("label_move_in")}</DetailsLabelText>
                </DetailsLabel>
                <DetailsValue>
                  <DetailsValueText>
                    {dayjs(data.moveInDate).format("DD. MMMM YYYY")}
                  </DetailsValueText>
                </DetailsValue>
              </DetailsItem>
              {product === "deposit" ? (
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>
                      {t("label_guarantee_ends")}
                    </DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>
                      {isNorway && data.endDate
                        ? dayjs(data.endDate).format("DD. MMMM YYYY")
                        : null}
                    </DetailsValueText>
                  </DetailsValue>
                </DetailsItem>
              ) : (
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>{t("label_move_out")}</DetailsLabelText>
                  </DetailsLabel>

                  <DetailsValueText>
                    {data.moveOutDate
                      ? dayjs(data.moveOutDate).format("DD. MMMM YYYY")
                      : null}
                  </DetailsValueText>
                </DetailsItem>
              )}
            </DetailsList>
          </Details>
        </CardWidgetHeaderContent>
      </CardWidgetHeader>
      {isOnboarding && (
        <CardWidgetSection className="-mt-9 pb-0">
          <Card className={"rounded-2xl border-0 bg-background"}>
            <Tabs onValueChange={onTabChange} value={activeTab}>
              <TabsList>
                <TabsTrigger value={"agreement"}>
                  {t("label_agreement")}
                </TabsTrigger>
                <TabsTrigger value={"tenant-progress"}>
                  {t("label_tenant_progress")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
        </CardWidgetSection>
      )}
      <CardWidgetContent>
        {(isOnboarding && activeTab === "agreement") || !isOnboarding ? (
          <CardWidgetSection>
            <Details>
              <DetailsTitle className="mb-3">
                <DetailsTitleText className="text-sm">
                  {t("label_lease_conditions")}
                </DetailsTitleText>
              </DetailsTitle>
              <DetailsList>
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>{`${t("label_deposit")} (${getMonthsText(t, data.depositMonths)})`}</DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>
                      {formatNumber(data.rentalFee * data.depositMonths)}{" "}
                      {isNorway ? "NOK" : "DKK"}
                    </DetailsValueText>
                  </DetailsValue>
                </DetailsItem>
                {!isNorway && data.prepaidMonths !== undefined && (
                  <DetailsItem>
                    <DetailsLabel>
                      <DetailsLabelText>{`${t("label_prepaid_rent")}${data.prepaidMonths > 0 ? ` (${getMonthsText(t, data.prepaidMonths)})` : ""}`}</DetailsLabelText>
                    </DetailsLabel>
                    <DetailsValue>
                      {data.prepaidMonths === 0 ? (
                        <DetailsValueText>
                          {t("label_no_prepaid_rent")}
                        </DetailsValueText>
                      ) : (
                        <DetailsValueText>
                          {formatNumber(data.rentalFee * data.prepaidMonths)}{" "}
                          {isNorway ? "NOK" : "DKK"}
                        </DetailsValueText>
                      )}
                    </DetailsValue>
                  </DetailsItem>
                )}
                <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>{t("label_rent")}</DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>
                      {formatNumber(data.rentalFee)} {isNorway ? "NOK" : "DKK"}
                    </DetailsValueText>
                  </DetailsValue>
                </DetailsItem>
              </DetailsList>
              {product === "secure" && (
                <>
                  <DetailsTitle className="mb-3 mt-4">
                    <DetailsTitleText className="text-sm">
                      {t("label_deposit_balance")}
                    </DetailsTitleText>
                  </DetailsTitle>
                  <DetailsList>
                    <DetailsItem>
                      <DetailsLabel>
                        <DetailsLabelText>
                          {t("label_deposited_by_tenant")}
                        </DetailsLabelText>
                      </DetailsLabel>
                      <DetailsValue>
                        <DetailsValueText>
                          {formatNumber(data.depositedAmount.value)}{" "}
                          {data.depositedAmount.currency.toLocaleUpperCase()}
                        </DetailsValueText>
                      </DetailsValue>
                    </DetailsItem>
                    {/* TODO: add annual interest rate when supported */}
                    {/* <DetailsItem>
                  <DetailsLabel>
                    <DetailsLabelText>
                      {t('label_annual_interest_rate')}
                    </DetailsLabelText>
                  </DetailsLabel>
                  <DetailsValue>
                    <DetailsValueText>{data.interestRate}%</DetailsValueText>
                  </DetailsValue>
                </DetailsItem> */}
                  </DetailsList>
                </>
              )}
            </Details>
          </CardWidgetSection>
        ) : (
          <CardWidgetSection>
            {isOnboarding && (
              <Accordion
                multiple
                defaultExpanded={[data?.productOnboardings.tenants[0].id]}
              >
                {!data.productOnboardings?.tenants?.length ? (
                  <AccordionWidgetSkeleton />
                ) : (
                  data?.productOnboardings?.tenants.map((tenant, i) => (
                    <AccordionItem value={tenant.id} key={tenant.id}>
                      <AccordionTrigger>
                        <AccordionHeader>
                          <DetailsLabel className="my-2 flex-row items-center gap-x-2">
                            {(tenant.nationality && (
                              <CountryFlag
                                aspectRatio="3x2"
                                iso2={tenant.nationalityCode as TCountryCode}
                                className="h-[13px] w-[20px]"
                              />
                            )) || <GlobeQuestion className="size-5 stroke-2" />}
                            <DetailsValueText>{tenant.name}</DetailsValueText>
                            {i === 0 && (
                              <Badge variant="brand-soft" size="small">
                                <BadgeText> Primary </BadgeText>
                              </Badge>
                            )}
                          </DetailsLabel>
                        </AccordionHeader>
                      </AccordionTrigger>
                      <AccordionContent className="gap-y-2">
                        <LeaseTenantOnboardingSteps
                          productType={productType}
                          steps={tenant.onboardingSteps}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            )}
          </CardWidgetSection>
        )}
      </CardWidgetContent>
      <CardFooter>
        <View className="w-full flex-row gap-4">
          {data.state === "Onboarding" && (
            <RevokeInvitationAction
              product={product}
              invitationId={data.invitationId}
              complexId={data.rental.complexId}
              rentalId={data.rental.id}
            />
          )}

          {data.state === "Active" && (
            <StartMoveoutAction tenantGroupId={data.tenantGroupId} />
          )}

          {data.state === "MovingOut" &&
            product === "deposit" &&
            isPermitted(role.featureSets, "Manage Claims") && (
              <Button
                color="brand-soft"
                className="flex-1"
                onPress={() => {
                  if (data.claimId && data.state === "MovingOut") {
                    router.push(`/keyhole-claims/ongoing/${data.claimId}`);
                  }
                }}
              >
                <ButtonText className="text-foreground dark:text-foreground">
                  {`${t("label_view")} ${t("label_claim").toLowerCase()}`}
                </ButtonText>
              </Button>
            )}
        </View>
      </CardFooter>
    </CardWidget>
  );
}

function RevokeInvitationAction(props: {
  product: LeaseProductWidgetProps["product"];
  invitationId: string;
  complexId: string;
  rentalId: string;
}) {
  const { t, getErrorV2 } = useLocalizationContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const organization = useOrganization();
  const isNorway = organization.locale === "no";

  const deleteInvitationMutation = useDeleteInvitationMutation();
  const deleteInvitationNorwayMutation =
    useDeleteDepositNorwayInvitationMutation();
  const deleteInvitationSecureMutation = useDeleteSecureInvitationMutation();

  const isLoading =
    deleteInvitationMutation.isPending ||
    deleteInvitationNorwayMutation.isPending ||
    deleteInvitationSecureMutation.isPending;

  const handleRevokeInvitation = async () => {
    try {
      if (isNorway) {
        if (props.product === "secure") {
          await deleteInvitationSecureMutation.mutateAsync({
            id: props.invitationId,
          });
        } else {
          await deleteInvitationNorwayMutation.mutateAsync({
            depositId: props.invitationId,
          });
        }
      } else {
        await deleteInvitationMutation.mutateAsync({
          invitationId: props.invitationId,
        });
      }
      router.replace(`/properties/${props.complexId}/rental/${props.rentalId}`);
    } catch (error) {
      toast.add({
        type: "error",
        title: t("label_an_error_happend"),
        description: getErrorV2(error),
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button color="red-soft" className="flex-1">
          <ButtonText className="text-foreground dark:text-foreground">
            {t("revoke_product_invitation_alert_confirm")}
          </ButtonText>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("revoke_product_invitation_alert_title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("revoke_product_invitation_alert_description", {
              product:
                props.product === "deposit"
                  ? "Keyhole Guarantee"
                  : "Keyhole Secure",
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            <ButtonText>
              {t("revoke_product_invitation_alert_cancel")}
            </ButtonText>
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onPress={async (e) => {
              e.preventDefault();
              await handleRevokeInvitation();
            }}
          >
            {isLoading && (
              <ButtonIcon className="animate-spin">
                <LoaderCircle />
              </ButtonIcon>
            )}
            <ButtonText className="text-destructive-foreground dark:text-destructive-foreground">
              {t("revoke_product_invitation_alert_confirm")}
            </ButtonText>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function StartMoveoutAction({ tenantGroupId }: { tenantGroupId: string }) {
  const { t } = useLocalizationContext();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button className="flex-1" color="red-soft" onPress={() => setOpen(true)}>
        <ButtonText className="text-foreground dark:text-foreground">
          {t("label_start_moveout")}
        </ButtonText>
      </Button>
      <InitiateMoveOutDialog
        open={open}
        onOpenChange={setOpen}
        tenantGroupId={tenantGroupId}
      />
    </>
  );
}

export function LeaseProductWidgetSkeleton() {
  return (
    <Card className="z-50 w-full gap-2 rounded-2xl p-2">
      <View className="w-full">
        <View className="gap-6 rounded-lg p-6">
          <Skeleton className="h-[34px] w-32 rounded-2xl" />
          <View className="flex-row gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-6 w-44" />
            </View>
          </View>
          <View className="w-full gap-2">
            <View className="w-full flex-row">
              <View className="w-1/2">
                <Skeleton className="h-5 w-14" />
              </View>
              <Skeleton className="h-5 w-28" />
            </View>
            <View className="w-full flex-row">
              <View className="w-1/2">
                <Skeleton className="h-5 w-28" />
              </View>
              <Skeleton className="h-5 w-28" />
            </View>
          </View>
        </View>
        <View className="w-full gap-3 p-6">
          <Skeleton className="mt-2 h-5 w-28" />
          <View className="gap-2">
            <View className="flex-row">
              <View className="w-1/2">
                <Skeleton className="h-5 w-32" />
              </View>
              <Skeleton className="h-5 w-20" />
            </View>
            <View className="flex-row">
              <View className="w-1/2">
                <Skeleton className="h-5 w-40" />
              </View>
              <Skeleton className="h-5 w-20" />
            </View>
            <View className="flex-row">
              <View className="w-1/2">
                <Skeleton className="h-5 w-10" />
              </View>
              <Skeleton className="h-5 w-20" />
            </View>
          </View>
        </View>
        <View className="p-6 pt-2">
          <Skeleton className="h-9 w-full" />
        </View>
      </View>
    </Card>
  );
}

function AccordionWidgetSkeleton() {
  return (
    <View className="mt-2 flex flex-col gap-4">
      <Skeleton className="h-6 w-40" />
      <View style={{ rowGap: 10 }} className="flex flex-col">
        <View className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-40" />
        </View>
        <View className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-64" />
        </View>
        <View className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-40" />
        </View>
        <View className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-28" />
        </View>
        <View className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-40" />
        </View>
      </View>
    </View>
  );
}
