import {
  Html,
  Button,
  Body,
  Head,
  Container,
  Heading,
  Text,
  BodyProps,
  HeadProps,
  ContainerProps,
  Section,
  SectionProps,
  HtmlProps,
} from "@react-email/components";
import { cn } from "@usekeyhole/utils";
import React, { Children } from "react";

/* -------------------------------------------------------------------------------------------------
 * EmailLayout
 * -----------------------------------------------------------------------------------------------*/

type EmailLayoutProps = HtmlProps;

const EmailLayout = React.forwardRef<HTMLElement, EmailLayoutProps>(
  ({ children, ...props }, ref) => {
    return (
      <Html lang="en" dir="ltr" {...props}>
        {children}
      </Html>
    );
  }
);
EmailLayout.displayName = "EmailLayout";

/* -------------------------------------------------------------------------------------------------
 * EmailLayoutBody
 * -----------------------------------------------------------------------------------------------*/

type EmailLayoutBodyProps = BodyProps;

const EmailLayoutBody = React.forwardRef<HTMLBodyElement, EmailLayoutBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <Body
        ref={ref}
        className={cn("p-12 gap-10 flex flex-col bg-red-100", className)}
        {...props}
      />
    );
  }
);
EmailLayoutBody.displayName = "EmailLayoutBody";

/* -------------------------------------------------------------------------------------------------
 * EmailLayoutHeader
 * -----------------------------------------------------------------------------------------------*/

type EmailLayoutHeaderProps = HeadProps;

const EmailLayoutHeader = React.forwardRef<
  HTMLHeadElement,
  EmailLayoutHeaderProps
>(({ className, ...props }, ref) => {
  return <Section className={cn("", className)} {...props} />;
});
EmailLayoutHeader.displayName = "EmailLayoutHeader";

/* -------------------------------------------------------------------------------------------------
 * EmailLayoutContent
 * -----------------------------------------------------------------------------------------------*/

type EmailLayoutContentProps = SectionProps;

const EmailLayoutContent = React.forwardRef<
  HTMLDivElement,
  EmailLayoutContentProps
>(({ className, ...props }, ref) => {
  return (
    <Section
      className={cn("w-full gap-6 flex flex-col bg-red-300", className)}
      {...props}
    />
  );
});
EmailLayoutContent.displayName = "EmailLayoutContent";

/* -------------------------------------------------------------------------------------------------
 * EmailLayoutInfoBox
 * -----------------------------------------------------------------------------------------------*/

type EmailLayoutInfoBoxProps = ContainerProps;

const EmailLayoutInfoBox = React.forwardRef<
  HTMLDivElement,
  EmailLayoutInfoBoxProps
>(({ className, ...props }, ref) => {
  return <Section className={cn("", className)} {...props} />;
});
EmailLayoutInfoBox.displayName = "EmailLayoutInfoBox";

export {
  EmailLayout,
  EmailLayoutProps,
  EmailLayoutBody,
  EmailLayoutBodyProps,
  EmailLayoutContent,
  EmailLayoutContentProps,
  EmailLayoutHeader,
  EmailLayoutHeaderProps,
  EmailLayoutInfoBox,
  EmailLayoutInfoBoxProps,
};
