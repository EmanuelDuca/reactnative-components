import { Meta, StoryObj } from "@storybook/react";
import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from "./checkbox";
import { Text, View } from "react-native";

const meta = {
  title: "NATIVEWIND/components/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      defaultValue: false,
      type: "boolean",
    },
    checked: {
      description:
        "Checked propety is for controling the Checkbox Component from outside",
    },
    defaultValue: {
      defaultValue: false,
      description:
        "defaultValue is for setting the checkbox checked/unchecked in case the component is not controled outside",
    },
    onChange: {
      action: "onChange",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Overview: Story = {
  render: () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <Checkbox>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Default</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox hovered>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Default & Hovered</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox pressed>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Default & Pressed</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox disabled>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Disabled</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox checked>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Checked</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox checked hovered>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Checked & hovered</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox disabled checked>
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Checked & Disabled </CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
        <Checkbox variant="destructive">
          <CheckboxIndicator />
          <CheckboxContent>
            <CheckboxLabel>Destructive (validation)</CheckboxLabel>
            <CheckboxDescription>Testing it out</CheckboxDescription>
          </CheckboxContent>
        </Checkbox>
      </View>
    );
  },
};

export const Basic: Story = {
  args: {
    children: "Checkbox",
  },
};

export const Indicator: Story = {
  args: {
    children: <CheckboxIndicator />,
  },
};

export const TextandIndicator: Story = {
  render: (args) => (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Checkbox {...args}>
        <CheckboxIndicator />
        <CheckboxContent>
          <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
          <CheckboxDescription>
            You agree to our Terms of Service and Privacy Policy.
          </CheckboxDescription>
        </CheckboxContent>
      </Checkbox>
    </View>
  ),
};
