// roving-focus-group.stories.tsx

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RovingFocusGroup, RovingFocusGroupItem } from "./roving-focus-group";

const meta: Meta = {
  title: "Components/RovingFocusGroup",
  component: RovingFocusGroup,
};

export default meta;

type Story = StoryObj;

export const HorizontalNavigation: Story = {
  render: () => (
    <RovingFocusGroup orientation="horizontal" loop>
      <div style={{ display: "flex", gap: "8px" }}>
        <RovingFocusGroupItem>
          <button>Item 1</button>
        </RovingFocusGroupItem>
        <RovingFocusGroupItem>
          <button>Item 2</button>
        </RovingFocusGroupItem>
        <RovingFocusGroupItem>
          <button>Item 3</button>
        </RovingFocusGroupItem>
      </div>
    </RovingFocusGroup>
  ),
};

export const VerticalNavigation: Story = {
  render: () => (
    <RovingFocusGroup orientation="vertical" loop>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <RovingFocusGroupItem>
          <button>Option A</button>
        </RovingFocusGroupItem>
        <RovingFocusGroupItem>
          <button>Option B</button>
        </RovingFocusGroupItem>
        <RovingFocusGroupItem>
          <button>Option C</button>
        </RovingFocusGroupItem>
      </div>
    </RovingFocusGroup>
  ),
};

export const NestedScopedGroups: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "32px" }}>
      <RovingFocusGroup orientation="vertical" loop>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <RovingFocusGroupItem>
            <button>Left 1</button>
          </RovingFocusGroupItem>
          <RovingFocusGroupItem>
            <button>Left 2</button>
          </RovingFocusGroupItem>
        </div>
      </RovingFocusGroup>

      <RovingFocusGroup orientation="vertical" loop>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <RovingFocusGroupItem>
            <button>Right A</button>
          </RovingFocusGroupItem>
          <RovingFocusGroupItem>
            <button>Right B</button>
          </RovingFocusGroupItem>
        </div>
      </RovingFocusGroup>
    </div>
  ),
};
