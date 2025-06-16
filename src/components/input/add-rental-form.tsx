import {
  Button,
  ButtonIcon,
  ButtonText,
  CircleInfo,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoaderCircle,
  Text,
} from "@usekeyhole/nativewind";
import React from "react";
import { useForm } from "react-hook-form";
//import { useLocalizationContext } from "../../../contexts/LocalizationContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import { isEmpty, merge } from "lodash";
import { View } from "react-native";
//import { useComplexSearch } from "../../../hooks/use-complex-search";
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@usekeyhole/web";
import {
  getDepositMonthsText,
  getPrepaidMonthsText,
  isEmpty,
  merge,
  useComplexSearch,
  useLocalizationContext,
  useOrganization,
} from "./mocks";
import { NumberInput } from "./number-input";
import { Input, InputEndAdornment } from "./input";
//import { NumberInput } from "../../components/number-input";
//import { useOrganization } from "../../../hooks/profile-store";
//import { getPrepaidMonthsText } from "../../components/select-prepaid-months";
//import { getDepositMonthsText } from "../../components/select-deposit-months";
//import { useLocalizationContext } from "./mocks";

const useSchema = () => {
  const { t } = useLocalizationContext();
  return React.useMemo(() => {
    return z.object({
      handle: z.string(),
      address: z.string().min(1, { message: t("form_error_required") }),
      number: z.string(),
      city: z.string().min(1, { message: t("form_error_required") }),
      zipcode: z
        .string()
        .min(1, { message: t("form_error_required") })
        .regex(/^[0-9]{4}$/, { message: t("form_invalid_zipcode") }),
      complex: z
        .object({
          id: z.string(),
          name: z.string(),
          prepaidMonths: z.number(),
          depositMonths: z.number(),
        })
        .refine((data) => !!data.id, t("form_error_required")),
      rentalFee: z.number().min(1, { message: t("form_error_required") }),
    });
  }, [t]);
};

type FormValues = z.infer<ReturnType<typeof useSchema>>;

const DEFAULT_VALUES: FormValues = {
  handle: "",
  address: "",
  number: "",
  city: "",
  zipcode: "",
  complex: {
    id: "",
    name: "",
    prepaidMonths: 0, // inherited from complex
    depositMonths: 0, // inherited from complex
  },
  rentalFee: 0,
};

export type AddRentalFormProps = {
  onSubmit?: (data: FormValues) => void;
  values?: FormValues;
  defaultValues?: Partial<FormValues>;
  isSubmitting?: boolean;
  // When using the form in a context where the complex is predetermined
  // we usually lock the complex field
  lockComplex?: boolean;
};

export type AddRentalFormRef = {
  validateForm: () => void;
};

export const AddRentalForm = React.forwardRef<
  AddRentalFormRef,
  AddRentalFormProps
>((props: AddRentalFormProps, ref) => {
  const { t, formatNumber } = useLocalizationContext();

  const organization = useOrganization();
  const isDenmark = organization.locale === "dk";

  const schema = useSchema();

  const defaultValues = merge({}, DEFAULT_VALUES, props.defaultValues);

  const form = useForm<FormValues>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    values: props.values,
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Submit Add Rental Form", data);
    props.onSubmit?.(data);
  });

  React.useImperativeHandle(ref, () => ({
    validateForm: () => form.trigger(),
  }));

  const rentalFee = form.watch("rentalFee");
  const currency = isDenmark ? "DKK" : "NOK";

  React.useEffect(() => {
    if (!isEmpty(form.formState.errors)) form.trigger();
  }, [form, t]);

  return (
    <Form {...form}>
      <View className="flex flex-col gap-4">
        <View className="flex flex-row items-start gap-4">
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => {
              return (
                <FormItem className="w-[160px]">
                  <RentalHandleFormLabel />
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>{t("label_address")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </View>
        <View className="flex flex-row items-start gap-4">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Apartment Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem className="flex-[2]">
                  <FormLabel>{t("label_city")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>{t("label_postal_code")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </View>
        <FormField
          control={form.control}
          name="complex"
          render={({ field, fieldState }) => {
            return (
              <FormItem className="flex-1" disabled={props.lockComplex}>
                <FormLabel>{t("Property")}</FormLabel>
                <FormControl>
                  {props.lockComplex ? (
                    <Input disabled value={field.value.name} className="" />
                  ) : (
                    <SelectComplexInput
                      value={field.value}
                      onSelect={field.onChange}
                      destructive={!!fieldState.error}
                    />
                  )}
                </FormControl>
                {!props.lockComplex && (
                  <FormDescription persist={false}>
                    {t("form_rental_select_complex_description")}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <View className="flex flex-row items-start justify-start gap-x-4">
          <FormField
            control={form.control}
            name="rentalFee"
            render={({ field, fieldState }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>{t("label_rent")}</FormLabel>
                  <FormControl>
                    <NumberInput
                      {...field}
                      endAdornment={
                        <InputEndAdornment>
                          <Text className="font-semibold text-muted-foreground">
                            {currency}
                          </Text>
                        </InputEndAdornment>
                      }
                      placeholder={t("form_rental_rental_fee_placeholder")}
                      value={field.value}
                      empty={field.value === 0 && !fieldState.isDirty}
                      onChange={({ numericValue }) => {
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form_rental_rental_fee_description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <View className="flex flex-1 flex-col gap-y-2">
            <View className="gap-y-4">
              <FormField
                control={form.control}
                name="complex"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>{t("label_deposit")}</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          value={getDepositMonthsText(
                            t,
                            field.value.depositMonths
                          )}
                          endAdornment={
                            <InputEndAdornment>
                              <Text className="font-semibold">
                                {formatNumber(
                                  rentalFee * field.value.depositMonths
                                )}{" "}
                                {currency}
                              </Text>
                            </InputEndAdornment>
                          }
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              {isDenmark && (
                <FormField
                  control={form.control}
                  name="complex"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>{t("label_prepaid_rent")}</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            value={getPrepaidMonthsText(
                              t,
                              field.value.prepaidMonths
                            )}
                            endAdornment={
                              <InputEndAdornment>
                                <Text className="font-semibold">
                                  {formatNumber(
                                    rentalFee * field.value.prepaidMonths
                                  )}{" "}
                                  {currency}
                                </Text>
                              </InputEndAdornment>
                            }
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              )}
            </View>
            <FormDescription>
              {t("form_lease_details_deposit_months_tooltip")}
            </FormDescription>
          </View>
        </View>
        <Button
          color="brand"
          size="lg"
          className="mt-6 self-start"
          onPress={onSubmit}
          disabled={props.isSubmitting}
        >
          {props.isSubmitting && (
            <ButtonIcon className="animate-spin">
              <LoaderCircle />
            </ButtonIcon>
          )}
          <ButtonText>{t("label_save_rental")}</ButtonText>
        </Button>
      </View>
    </Form>
  );
});

AddRentalForm.displayName = "AddRentalForm";

function SelectComplexInput(props: {
  onSelect: (complex: FormValues["complex"]) => void;
  value: FormValues["complex"];
  destructive?: boolean;
}) {
  const { t } = useLocalizationContext();

  const complexSearch = useComplexSearch();

  return (
    <Select value={props.value.id}>
      <SelectTrigger variant={props.destructive ? "destructive" : "default"}>
        <SelectValue>{props.value.name}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[678px]" shouldFilter={false}>
        <SelectInput
          placeholder={t("form_select_complex_placeholder")}
          value={complexSearch.searchString}
          onValueChange={complexSearch.search}
        />
        <SelectList>
          <SelectEmpty>{t("form_select_complex_empty")}</SelectEmpty>
          {complexSearch.results.length > 0 && (
            <SelectGroup>
              {complexSearch.results.map((complex) => (
                <SelectItem
                  key={complex.id}
                  value={complex.id}
                  onSelect={() => {
                    props.onSelect({
                      id: complex.id,
                      name: complex.name,
                      prepaidMonths: complex.prepaidMonths,
                      depositMonths: complex.depositMonths,
                    });
                    complexSearch.clearSearch();
                  }}
                >
                  <Text>{complex.name}</Text>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

function RentalHandleFormLabel() {
  const { t } = useLocalizationContext();
  const [hovering, setHovering] = React.useState(false);
  return (
    <Tooltip open={hovering} onOpenChange={setHovering}>
      <View
        className="flex flex-row items-center gap-2"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <Text>{t("label_tenancy_number")}</Text>
        <TooltipTrigger>
          <CircleInfo className="size-4 stroke-muted-foreground stroke-2" />
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text>{t("form_rental_details_handle_tooltip")}</Text>
        </TooltipContent>
      </View>
    </Tooltip>
  );
}
