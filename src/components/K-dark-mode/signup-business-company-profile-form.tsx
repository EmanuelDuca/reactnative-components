import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { View, ViewProps } from "react-native";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonText,
  ButtonIcon,
  CircleInfo,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Heading,
  Input,
  LoaderCircle,
  MapPin,
  RadioGroup,
  RadioGroupContent,
  RadioGroupIndicator,
  RadioGroupIndicatorInner,
  RadioGroupItem,
  RadioGroupLabel,
  Search as SearchIcon,
  Text,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";
import { CountrySelectorFlag } from "@usekeyhole/web";
import {
  Search,
  SearchEmpty,
  SearchInput,
  SearchItem,
  SearchList,
  SearchListContent,
  SearchLoading,
  SearchSkeletonGroup,
  SearchSkeletonItem,
} from "~/components/K-dark-mode/search";

/*
    Experimental code
*/

const isEmpty = (val: any) =>
  val === null ||
  val === undefined ||
  (typeof val === "string" && val.trim() === "");

const merge = (...objects: any[]) => Object.assign({}, ...objects);

// Mock implementations:
const useAddressSearch = () => ({
  clearSearch: () => {},
  isSearching: false,
  results: [
    { address: "Testvej 1", city: "Copenhagen", zipcode: "1000" },
    { address: "Testgade 2", city: "Aarhus", zipcode: "8000" },
  ],
  search: () => {},
  searchString: "",
});

const useCompanySearch = () => ({
  clearSearch: () => {},
  isSearching: false,
  results: [
    {
      companyNumber: "12345678",
      companyName: "Mocked Company A",
      address: "Mock Street 1",
      zipcode: "1000",
      city: "Copenhagen",
    },
    {
      companyNumber: "87654321",
      companyName: "Mocked Company B",
      address: "Second Street",
      zipcode: "2100",
      city: "Aarhus",
    },
  ],
  search: () => {},
  searchString: "",
});

type SignupBusinessCompanyProfileFormTexts = {
  formTitle: React.ReactNode;
  formDescription: React.ReactNode;
  formMarketLabel: React.ReactNode;
  formMarketValueDK: React.ReactNode;
  formMarketValueNO: React.ReactNode;
  formMarketErrorRequired: React.ReactNode;
  formNameLabel: React.ReactNode;
  formRegistrationNumberLabel: React.ReactNode;
  formCompanySearchPlaceholder: React.ReactNode;
  formCompanySearchNoResults: React.ReactNode;
  formRegistrationNumberErrorInvalidDK: React.ReactNode;
  formRegistrationNumberErrorInvalidNO: React.ReactNode;
  formAddressLabel: React.ReactNode;
  formAddressSearchPlaceholder: React.ReactNode;
  formAddressSearchNoResults: React.ReactNode;
  formZipcodeLabel: React.ReactNode;
  formCityLabel: React.ReactNode;
  formErrorRequired: React.ReactNode;
  formSubmitButton: React.ReactNode;
};

const defaultTexts: Partial<SignupBusinessCompanyProfileFormTexts> = {
  formTitle: "Complete company profile",
  formDescription: "Add organization details to meet compliance requirements.",
  formMarketLabel: "Company registered in",
  formMarketValueDK: "Denmark",
  formMarketValueNO: "Norway",
  formMarketErrorRequired: "Select where your company is registered",
  formNameLabel: "Company name",
  formRegistrationNumberLabel: "Company registration number",
  formCompanySearchPlaceholder:
    "Search for company name or registration number",
  formCompanySearchNoResults: "No results found",
  formRegistrationNumberErrorInvalidDK:
    "This is not a valid danish company registration number",
  formRegistrationNumberErrorInvalidNO:
    "This is not a valid norwegian company registration number",
  formAddressLabel: "Address",
  formAddressSearchPlaceholder: "Search for address",
  formAddressSearchNoResults: "No results found",
  formZipcodeLabel: "Zipcode",
  formCityLabel: "City",
  formErrorRequired: "This field is required",
  formSubmitButton: "Save & Continue",
};

const useSignupBusinessCompanyProfileFormSchema = ({
  formErrorRequired,
  formMarketErrorRequired,
}: Partial<SignupBusinessCompanyProfileFormTexts>) => {
  return z
    .object({
      market: z.string().optional(),
      name: z.string().optional(),
      registrationNumber: z.string().optional(),
      address: z.string().optional(),
      zipcode: z.string().optional(),
      city: z.string().optional(),
    })
    .superRefine((values, ctx) => {
      const { market, name, registrationNumber, address, zipcode, city } =
        values;
    });
};

type SignupBusinessCompanyProfileFormValues = z.infer<
  ReturnType<typeof useSignupBusinessCompanyProfileFormSchema>
>;

// This can come from your database or API.
const defaultFormValues: Partial<SignupBusinessCompanyProfileFormValues> = {
  name: "",
  market: "",
  registrationNumber: "",
  address: "",
  zipcode: "",
  city: "",
};

type SignupBusinessCompanyProfileFormProps = ViewProps & {
  content?: JSX.Element | JSX.Element[];
  defaultValues?: Partial<SignupBusinessCompanyProfileFormValues>;
  description?: React.ReactNode;
  isSubmitting?: boolean;
  onSubmit?: (data: SignupBusinessCompanyProfileFormValues) => Promise<void>;
  texts?: Partial<SignupBusinessCompanyProfileFormTexts>;
  title?: React.ReactNode;
};

function SignupBusinessCompanyProfileForm({
  className,
  content,
  defaultValues: providedDefaultValues,
  description,
  isSubmitting: isSubmittingProp,
  onSubmit,
  texts,
  title,
  ...props
}: SignupBusinessCompanyProfileFormProps) {
  const combinedTexts = { ...defaultTexts, ...texts };

  const loginFormSchema =
    useSignupBusinessCompanyProfileFormSchema(combinedTexts);
  const {
    clearSearch: clearAddressSearch,
    isSearching: isSearchingAddress,
    results: addresses,
    search: addressSearch,
    searchString: addressSearchString,
  } = useAddressSearch();

  const defaultValues = merge({}, defaultFormValues, providedDefaultValues);

  const form = useForm<SignupBusinessCompanyProfileFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const watchedMarket = form.watch("market");
  const watchedStreet = form.watch("address");
  const watchedZipcode = form.watch("zipcode");
  const watchedCity = form.watch("city");

  const {
    clearSearch: clearCompanySearch,
    isSearching: isSearchingCompany,
    results: companies,
    search: companySearch,
    searchString: companySearchString,
  } = useCompanySearch({
    locale: watchedMarket as "dk" | "no",
  });

  const addressSelected =
    watchedStreet.length > 0 ||
    watchedZipcode.length > 0 ||
    watchedCity.length > 0;

  const addressSearchValue =
    !isEmpty(watchedStreet) && !isEmpty(watchedZipcode) && !isEmpty(watchedCity)
      ? `${watchedStreet}, ${watchedZipcode} ${watchedCity}`
      : addressSearchString;

  const isSubmitting = isSubmittingProp ?? form.formState.isSubmitting;

  const handleFormSubmit = React.useCallback(
    async (values: SignupBusinessCompanyProfileFormValues) => {
      await onSubmit?.(values);
    },
    [onSubmit]
  );

  const handleAddressSearchClear = React.useCallback(() => {
    clearAddressSearch();
    form.setValue("address", "");
    form.setValue("city", "");
    form.setValue("zipcode", "");
  }, [clearAddressSearch, form]);

  const handleCompanySearchClear = React.useCallback(() => {
    clearCompanySearch();
    form.setValue("registrationNumber", "");
    form.setValue("name", "");
  }, [clearCompanySearch, form]);

  React.useEffect(() => {
    // Trigger validation if
    if (!isEmpty(form.formState.errors)) form.trigger();
  }, [form, texts, watchedMarket]);

  return (
    <Form {...form}>
      <View className={cn("gap-6", className)} {...props}>
        <View className="gap-4">
          <Heading size="xl">{combinedTexts?.formTitle}</Heading>
          <Text className="leading-5 text-accent-foreground">
            {combinedTexts?.formDescription}
          </Text>
          {content}
        </View>
        <View className="z-10 gap-4">
          <FormField
            control={form.control}
            name="market"
            render={({ field, fieldState }) => {
              const { onChange, ...rest } = field;
              console.log({ market: field.value });
              return (
                <FormItem>
                  <FormLabel>{combinedTexts?.formMarketLabel}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-row"
                      setSelectedValue={(newValue) => {
                        onChange(newValue);
                        handleAddressSearchClear();
                        handleCompanySearchClear();
                        form.clearErrors();
                      }}
                      {...rest}
                    >
                      <Input
                        focused={watchedMarket === "dk"}
                        className="flex-1"
                        asChild
                      >
                        <RadioGroupItem value="dk">
                          <RadioGroupIndicator>
                            <RadioGroupIndicatorInner />
                          </RadioGroupIndicator>
                          <RadioGroupContent>
                            <RadioGroupLabel>
                              {combinedTexts?.formMarketValueDK}
                            </RadioGroupLabel>
                          </RadioGroupContent>
                          <CountrySelectorFlag className="ml-auto" code="DK" />
                        </RadioGroupItem>
                      </Input>
                      <Input
                        focused={watchedMarket === "no"}
                        className="flex-1"
                        asChild
                      >
                        <RadioGroupItem value="no">
                          <RadioGroupIndicator>
                            <RadioGroupIndicatorInner />
                          </RadioGroupIndicator>
                          <RadioGroupContent>
                            <RadioGroupLabel>
                              {combinedTexts?.formMarketValueNO}
                            </RadioGroupLabel>
                          </RadioGroupContent>
                          <CountrySelectorFlag className="ml-auto" code="NO" />
                        </RadioGroupItem>
                      </Input>
                    </RadioGroup>
                  </FormControl>
                  {fieldState.error && (
                    <Alert color="red" className="mt-2">
                      <AlertIcon>
                        <CircleInfo />
                      </AlertIcon>
                      <AlertTitle>{fieldState.error.message}</AlertTitle>
                    </Alert>
                  )}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => {
              return (
                <FormItem
                  className={cn("z-20", {
                    "opacity-50": isEmpty(watchedMarket),
                  })}
                >
                  <FormLabel>
                    {combinedTexts?.formRegistrationNumberLabel}
                  </FormLabel>
                  {/* This component should be changed  Search */}
                  <Search loading={isSearchingCompany} className="z-10">
                    {" "}
                    <FormControl>
                      <SearchInput
                        className="disabled:opacity-100"
                        disabled={isEmpty(watchedMarket)}
                        icon={SearchIcon}
                        value={companySearchString}
                        onValueChange={(value) => {
                          if (value === "") {
                            handleCompanySearchClear();
                          } else {
                            companySearch(value);
                          }
                        }}
                        placeholder={combinedTexts?.formCompanySearchPlaceholder?.toString()}
                      />
                    </FormControl>
                    <SearchList className="h-[136px]">
                      <SearchLoading>
                        <SearchSkeletonGroup>
                          <SearchSkeletonItem />
                        </SearchSkeletonGroup>
                      </SearchLoading>
                      <SearchListContent className="">
                        {companies.length === 0 && (
                          <SearchEmpty>
                            {combinedTexts?.formAddressSearchNoResults}
                          </SearchEmpty>
                        )}
                        {companies?.map((company) => (
                          <SearchItem
                            key={crypto.randomUUID()}
                            className="items-start justify-between gap-4 pl-9"
                            onSelect={() => {
                              field.onChange(company.companyNumber);
                              companySearch(company.companyNumber);
                              form.setValue("name", company.companyName);

                              // On danish market we have one address field, that needs a completed address.
                              // so we only fill it out if we have all the fields.
                              // On norwegian market we have separate fields for address, zipcode and city.
                              // so we can fill out what we have.
                              if (watchedMarket === "dk") {
                                if (
                                  company.address &&
                                  company.city &&
                                  company.zipcode
                                ) {
                                  addressSearch(
                                    `${company.address}, ${company.zipcode} ${company.city}`
                                  );
                                  form.setValue("address", company.address);
                                  form.setValue("city", company.city);
                                  form.setValue("zipcode", company.zipcode);
                                }
                              } else {
                                form.setValue("address", company.address);
                                form.setValue("city", company.city);
                                form.setValue("zipcode", company.zipcode);
                              }
                            }}
                          >
                            <Text>{company.companyNumber}</Text>
                            <Text className="text-right font-semibold">
                              {company.companyName}
                            </Text>
                          </SearchItem>
                        ))}
                      </SearchListContent>
                    </SearchList>
                  </Search>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem
                  className={cn({ "opacity-50": isEmpty(watchedMarket) })}
                >
                  <FormLabel>{combinedTexts?.formNameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEmpty(watchedMarket)}
                      onChangeText={onChange}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {(watchedMarket === "no" && (
            <View className="gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  const { onChange, ...rest } = field;
                  return (
                    <FormItem
                      className={cn({ "opacity-50": isEmpty(watchedMarket) })}
                    >
                      <FormLabel>{combinedTexts?.formAddressLabel}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isEmpty(watchedMarket)}
                          onChangeText={onChange}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <View className="flex-row gap-4">
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => {
                    const { onChange, ...rest } = field;
                    return (
                      <FormItem
                        className={cn("flex-1", {
                          "opacity-50": isEmpty(watchedMarket),
                        })}
                      >
                        <FormLabel>{combinedTexts?.formZipcodeLabel}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isEmpty(watchedMarket)}
                            onChangeText={onChange}
                            {...rest}
                          />
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
                    const { onChange, ...rest } = field;
                    return (
                      <FormItem
                        className={cn("flex-1", {
                          "opacity-50": isEmpty(watchedMarket),
                        })}
                      >
                        <FormLabel>{combinedTexts?.formCityLabel}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isEmpty(watchedMarket)}
                            onChangeText={onChange}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </View>
            </View>
          )) || (
            <View className="gap-4">
              {/* <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  const { onChange, ...rest } = field;
                  return (
                    <FormItem
                      className={cn({
                        "opacity-50": isEmpty(watchedMarket),
                      })}
                    >
                      <FormLabel>{combinedTexts?.formAddressLabel}</FormLabel>
                      <Search loading={isSearchingAddress} className="z-10">
                        <FormControl>
                          <SearchInput
                            className="disabled:opacity-100"
                            disabled={addressSelected || isEmpty(watchedMarket)}
                            icon={MapPin}
                            value={addressSearchValue}
                            onValueChange={(value) => {
                              if (value === "") {
                                handleAddressSearchClear();
                              } else {
                                addressSearch(value);
                              }
                            }}
                            placeholder={combinedTexts?.formAddressSearchPlaceholder?.toString()}
                          />
                        </FormControl>
                        <SearchList className="h-[136px]">
                          <SearchLoading>
                            SkeletonGroup>
                              <SearchSkeletonItem />
                            </SearchSkeletonGroup>
                          </SearchLoading>
                          <SearchListContent>
                            {addresses.length === 0 && (
                              <SearchEmpty>
                                {combinedTexts?.formAddressSearchNoResults}
                              </SearchEmpty>
                            )}
                            {addresses?.map((address) => (
                              <SearchItem
                                key={crypto.randomUUID()}
                                className="justify-between pl-9"
                                onSelect={() => {
                                  addressSearch(
                                    `${address.address}, ${address.zipcode} ${address.city}`
                                  );
                                  form.setValue("city", address.city);
                                  form.setValue("zipcode", address.zipcode);
                                  onChange(address.address);
                                }}
                              >
                                <span>{`${address.address}, ${address.zipcode} ${address.city}`}</span>
                              </SearchItem>
                            ))}
                          </SearchListContent>
                        </SearchList>
                      </Search>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
            </View>
          )}
        </View>
        <View className="mt-2 flex-row items-center">
          <Button
            disabled={isSubmitting}
            onPress={form.handleSubmit(handleFormSubmit)}
            size="lg"
            color="brand"
          >
            {isSubmitting && (
              <ButtonIcon className="animate-spin">
                <LoaderCircle />
              </ButtonIcon>
            )}
            <ButtonText>{combinedTexts.formSubmitButton}</ButtonText>
          </Button>
        </View>
      </View>
    </Form>
  );
}

export {
  SignupBusinessCompanyProfileForm,
  SignupBusinessCompanyProfileFormProps,
  SignupBusinessCompanyProfileFormValues,
};
