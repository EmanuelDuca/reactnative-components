import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, ButtonText } from "@usekeyhole/nativewind";

function PopoverDemo(props?: Partial<typeof Popover>) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button>
          <ButtonText>Open popover</ButtonText>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Demo</h4>
            <p className="text-muted-foreground text-sm">
              This is a demo of the popover component.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const meta: Meta<typeof Popover> = {
  title: "WEB/Components/Popover",
  component: Popover,
};

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => <PopoverDemo />,
};

export const Controlled: Story = {
  argTypes: {
    open: {
      defaultValue: true,
      type: "boolean",
    },
  },
  render: (props: any) => <PopoverDemo {...props} />,
};

export default meta;
