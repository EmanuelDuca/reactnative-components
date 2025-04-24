import * as React from "react";
import _MarkdownDisplay, {
  MarkdownProps as _MarkdownDisplayProps,
} from "react-native-markdown-display";
import { onlyText } from "react-children-utilities";
import renderRules from "./renderRules";

// react-native-markdown-display is so old that it assumes that all components have children typed
type MarkdownDisplayProps = React.PropsWithChildren<_MarkdownDisplayProps>;
const MarkdownDisplay = _MarkdownDisplay as React.FC<MarkdownDisplayProps>;

export type MarkdownProps = MarkdownDisplayProps;

export const Markdown: React.FC<MarkdownProps> = ({ children, ...props }) => {
  const text = onlyText(children);
  return (
    <MarkdownDisplay rules={renderRules} {...props}>
      {text}
    </MarkdownDisplay>
  );
};
