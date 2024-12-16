import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalizationContext } from "~/contexts/LocalizationContext";
import { z } from "zod";
import { View, Text } from "react-native";
import {
  Button,
  ButtonText,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
  Heading,
} from "@usekeyhole/nativewind";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
  RadioGroupIndicatorInner,
  RadioGroupContent,
  RadioGroupDescription,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";

type NpsFormTexts = {
  formTitle: React.ReactNode;
  formDescription: React.ReactNode;
  formScoreLabel: React.ReactNode;
  formCommentLabel: React.ReactNode;
  formSourceLabel: React.ReactNode;
  formOtherSourceLabel: React.ReactNode;
  formSubmitButton: React.ReactNode;
  formErrorSource: React.ReactNode;
};

const defaultTexts: Partial<NpsFormTexts> = {
  formTitle: "Rate your experience",
  formDescription: "Please help us to improve.",
  formScoreLabel:
    "How likely are you to recommend Keyhole to a friend or colleague?",
  formCommentLabel: "What is the main reason for your score?",
  formSourceLabel: "Where did you hear about Keyhole?",
  formOtherSourceLabel: "Other (please specify):",
  formSubmitButton: "Submit",
  formErrorSource: "Please select a source",
};

const useNpsFormSchema = ({ formErrorSource }: Partial<NpsFormTexts>) => {
  return z.object({
    score: z.number().min(1).max(10),
    comment: z.string().optional(),
    source: z.enum(
      [
        "SearchEngine",
        "SocialMedia",
        "AppStore",
        "Landlord",
        "FriendsFamily",
        "Other",
        "",
      ],
      { required_error: formErrorSource?.toString() }
    ),
    otherSourceComment: z.string().optional(),
  });
};

type NpsFormValues = z.infer<ReturnType<typeof useNpsFormSchema>>;

const defaultNpsFormValues: Partial<NpsFormValues> = {
  score: 0,
  comment: "",
  source: "",
  otherSourceComment: "",
};

type NpsFormProps = {
  defaultValues?: Partial<NpsFormValues>;
  description?: React.ReactNode;
  onSubmit?: (data: NpsFormValues) => void;
  texts?: Partial<NpsFormTexts>;
  isSubmitting?: boolean;
  className?: string;
  //small?: boolean;
};

function NpsForm({
  defaultValues = defaultNpsFormValues,
  description,
  onSubmit,
  texts,
  isSubmitting,
  className,
  //small,
  ...props
}: NpsFormProps) {
  const { t } = useLocalizationContext();
  const localizedTexts: Partial<NpsFormTexts> = {
    //formTitle: ,
    formCommentLabel: t("nps_input_message_title"),
    formSourceLabel: t("nps_referral_source_title"),
    formOtherSourceLabel: t("nps_referral_source_comment_title"),
    formSubmitButton: t("label_submit"),
  };
  const combinedTexts = { ...defaultTexts, ...localizedTexts, ...texts };
  const NpsFormSchema = useNpsFormSchema(combinedTexts);
  const form = useForm<NpsFormValues>({
    resolver: zodResolver(NpsFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleFormSubmit = React.useCallback(
    (values: NpsFormValues) => {
      onSubmit?.(values);
    },
    [onSubmit]
  );
  const sourceSelected = form.watch("source");

  return (
    <Form {...form}>
      <View className={cn("gap-4", className)} {...props}>
        <Heading size="xl">{combinedTexts.formTitle}</Heading>
        <Text className="text-accent-foreground mb-4">
          {combinedTexts.formDescription}
        </Text>

        {/* Comment textarea */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{combinedTexts.formCommentLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("label_write")}
                  onChangeText={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Source radio group */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{combinedTexts.formSourceLabel}</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  setSelectedValue={field.onChange}
                >
                  <RadioGroupItem value="SearchEngine">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label_search_engine")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                  <RadioGroupItem value="SocialMedia">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label_social_media")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                  <RadioGroupItem value="AppStore">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label_app_store")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                  <RadioGroupItem value="Landlord">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label_landlord")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                  <RadioGroupItem value="FriendsFamily">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label__recommendation_from_friend_family")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                  <RadioGroupItem value="Other">
                    <RadioGroupIndicator>
                      <RadioGroupIndicatorInner />
                    </RadioGroupIndicator>
                    <RadioGroupContent>
                      <RadioGroupDescription>
                        {t("label_other")}
                      </RadioGroupDescription>
                    </RadioGroupContent>
                  </RadioGroupItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {/* OTHER SOURCE COMMENT TEXTARE */}
        {sourceSelected === "Other" && (
          <FormField
            control={form.control}
            name="otherSourceComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{combinedTexts.formOtherSourceLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("label_write")}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {/* Submit button */}
        <View className="mt-2 flex-row items-center">
          <Button
            onPress={form.handleSubmit(handleFormSubmit)}
            disabled={!sourceSelected || isSubmitting}
            size="lg"
            variant="brand-solid"
          >
            <ButtonText>{combinedTexts.formSubmitButton}</ButtonText>
          </Button>
        </View>
      </View>
    </Form>
  );
}

export default NpsForm;
export type { NpsFormValues };
