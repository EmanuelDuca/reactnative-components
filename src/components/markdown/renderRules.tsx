import { cn } from "@usekeyhole/utils";
import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import FitImage from "react-native-fit-image";
import {
  MarkdownProps as _MarkdownDisplayProps,
  hasParents,
  openUrl,
} from "react-native-markdown-display";

import { Circle } from "@usekeyhole/nativewind";

import { Text } from "@usekeyhole/nativewind";
import { Link } from "expo-router";

import { onlyText } from "react-children-utilities";

// From "react-native-markdown-display/src/lib/data/textStyleProps"
const textStyleProps = [
  "textShadowOffset",
  "color",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "lineHeight",
  "textAlign",
  "textDecorationLine",
  "textShadowColor",
  "fontFamily",
  "textShadowRadius",
  "includeFontPadding",
  "textAlignVertical",
  "fontVariant",
  "letterSpacing",
  "textDecorationColor",
  "textDecorationStyle",
  "textTransform",
  "writingDirection",
];

const defaultTextClassNames = "text-sm text-foreground";
const defaultListClassNames = "gap-2";

export const renderRules = {
  // // when unknown elements are introduced, so it wont break
  // unknown: (node, children, parent, styles) => null,

  // // The main container
  // body: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_body}>
  //     {children}
  //   </View>
  // ),

  // // Headings
  // heading1: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading1}>
  //     {children}
  //   </View>
  // ),
  // heading2: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading2}>
  //     {children}
  //   </View>
  // ),
  // heading3: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading3}>
  //     {children}
  //   </View>
  // ),
  // heading4: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading4}>
  //     {children}
  //   </View>
  // ),
  // heading5: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading5}>
  //     {children}
  //   </View>
  // ),
  // heading6: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_heading6}>
  //     {children}
  //   </View>
  // ),

  // // Horizontal Rule
  // hr: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_hr} />
  // ),

  // Emphasis
  strong: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.strong}
      className={cn(defaultTextClassNames)}
    >
      {children}
    </Text>
  ),
  em: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.em}
      className={cn(defaultTextClassNames)}
    >
      {children}
    </Text>
  ),
  s: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.s} className={cn(defaultTextClassNames)}>
      {children}
    </Text>
  ),

  // Blockquotes
  blockquote: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_blockquote}>
      {children}
    </View>
  ),

  // Lists
  bullet_list: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={styles._VIEW_SAFE_bullet_list}
      className={cn(defaultListClassNames)}
    >
      {children}
    </View>
  ),
  ordered_list: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={styles._VIEW_SAFE_ordered_list}
      className={cn(defaultListClassNames)}
    >
      {children}
    </View>
  ),
  // this is a unique and quite annoying render rule because it has
  // child items that can be styled (the list icon and the list content)
  // outside of the AST tree so there are some work arounds in the
  // AST renderer specifically to get the styling right here
  list_item: (node, children, parent, styles, inheritedStyles = {}) => {
    // we need to grab any text specific stuff here that is applied on the list_item style
    // and apply it onto bullet_list_icon. the AST renderer has some workaround code to make
    // the content classes apply correctly to the child AST tree items as well
    // as code that forces the creation of the inheritedStyles object for list_items
    const refStyle = {
      ...inheritedStyles,
      ...StyleSheet.flatten(styles.list_item),
    };

    const arr = Object.keys(refStyle);

    const modifiedInheritedStylesObj = {};

    for (let b = 0; b < arr.length; b++) {
      if (textStyleProps?.includes(arr[b])) {
        modifiedInheritedStylesObj[arr[b]] = refStyle[arr[b]];
      }
    }

    if (hasParents(parent, "bullet_list")) {
      return (
        <View key={node.key} style={styles._VIEW_SAFE_list_item}>
          <View
            style={[modifiedInheritedStylesObj, styles.bullet_list_icon]}
            accessible={false}
          >
            {/* {Platform.select({
              android: "\u2022",
              ios: "\u00B7",
              default: "\u2022",
            })} */}
            <Circle className="fill-primary stroke-primary mt-[0.4em] h-2 w-2" />
          </View>
          <View
            style={styles._VIEW_SAFE_bullet_list_content}
            className={cn(defaultListClassNames)}
          >
            {children}
          </View>
        </View>
      );
    }

    if (hasParents(parent, "ordered_list")) {
      const orderedListIndex = parent.findIndex(
        (el) => el.type === "ordered_list"
      );

      const orderedList = parent[orderedListIndex];
      let listItemNumber;

      if (orderedList.attributes && orderedList.attributes.start) {
        listItemNumber = orderedList.attributes.start + node.index;
      } else {
        listItemNumber = node.index + 1;
      }

      return (
        <View
          key={node.key}
          style={styles._VIEW_SAFE_list_item}
          className={cn(defaultListClassNames)}
        >
          <Text
            style={[modifiedInheritedStylesObj, styles.ordered_list_icon]}
            className={cn(defaultTextClassNames)}
          >
            {listItemNumber}
            {node.markup}
          </Text>
          <View style={styles._VIEW_SAFE_ordered_list_content}>{children}</View>
        </View>
      );
    }

    // we should not need this, but just in case
    return (
      <View key={node.key} style={styles._VIEW_SAFE_list_item}>
        {children}
      </View>
    );
  },

  // Code
  code_inline: (node, children, parent, styles, inheritedStyles = {}) => (
    <Text
      key={node.key}
      style={[inheritedStyles, styles.code_inline]}
      className={cn(defaultTextClassNames)}
    >
      {node.content}
    </Text>
  ),
  code_block: (node, children, parent, styles, inheritedStyles = {}) => {
    // we trim new lines off the end of code blocks because the parser sends an extra one.
    let { content } = node;

    if (
      typeof node.content === "string" &&
      node.content.charAt(node.content.length - 1) === "\n"
    ) {
      content = node.content.substring(0, node.content.length - 1);
    }

    return (
      <Text
        key={node.key}
        style={[inheritedStyles, styles.code_block]}
        className={cn(defaultTextClassNames)}
      >
        {content}
      </Text>
    );
  },
  fence: (node, children, parent, styles, inheritedStyles = {}) => {
    // we trim new lines off the end of code blocks because the parser sends an extra one.
    let { content } = node;

    if (
      typeof node.content === "string" &&
      node.content.charAt(node.content.length - 1) === "\n"
    ) {
      content = node.content.substring(0, node.content.length - 1);
    }

    return (
      <Text
        key={node.key}
        style={[inheritedStyles, styles.fence]}
        className={cn(defaultTextClassNames)}
      >
        {content}
      </Text>
    );
  },

  // // Tables
  // table: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_table}>
  //     {children}
  //   </View>
  // ),
  // thead: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_thead}>
  //     {children}
  //   </View>
  // ),
  // tbody: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_tbody}>
  //     {children}
  //   </View>
  // ),
  // th: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_th}>
  //     {children}
  //   </View>
  // ),
  // tr: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_tr}>
  //     {children}
  //   </View>
  // ),
  // td: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_td}>
  //     {children}
  //   </View>
  // ),

  // Links
  link: (node, children, parent, styles, onLinkPress) => {
    const href = node.attributes?.href;
    if (!href) return null;
    const text = onlyText(children);
    return (
      <Link href={href} key={node.key} asChild onPress={onLinkPress}>
        <View>
          <Text className="text-blue-600">{text}</Text>
        </View>
      </Link>
    );
  },
  /* link: (node, children, parent, styles, onLinkPress)=>(
    <View className='size-10 bg-red-500'/>
  ) */
  // blocklink: (node, children, parent, styles, onLinkPress) => (
  //   <TouchableWithoutFeedback
  //     key={node.key}
  //     onPress={() => openUrl(node.attributes.href, onLinkPress)}
  //     style={styles.blocklink}
  //   >
  //     <View style={styles.image}>{children}</View>
  //   </TouchableWithoutFeedback>
  // ),

  // // Images
  // image: (
  //   node,
  //   children,
  //   parent,
  //   styles,
  //   allowedImageHandlers,
  //   defaultImageHandler
  // ) => {
  //   const { src, alt } = node.attributes;

  //   // we check that the source starts with at least one of the elements in allowedImageHandlers
  //   const show =
  //     allowedImageHandlers.filter((value) => {
  //       return src.toLowerCase().startsWith(value.toLowerCase());
  //     }).length > 0;

  //   if (show === false && defaultImageHandler === null) {
  //     return null;
  //   }

  //   const imageProps = {
  //     indicator: true,
  //     key: node.key,
  //     style: styles._VIEW_SAFE_image,
  //     source: {
  //       uri: show === true ? src : `${defaultImageHandler}${src}`,
  //     },
  //   };

  //   if (alt) {
  //     imageProps.accessible = true;
  //     imageProps.accessibilityLabel = alt;
  //   }

  //   return <FitImage {...imageProps} />;
  // },

  // Text Output
  text: (node, children, parent, styles, inheritedStyles = {}) => (
    <Text
      key={node.key}
      style={[inheritedStyles, styles.text]}
      className={cn(defaultTextClassNames)}
    >
      {node.content}
    </Text>
  ),
  textgroup: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.textgroup}
      className={cn(defaultTextClassNames)}
    >
      {children}
    </Text>
  ),
  // paragraph: (node, children, parent, styles) => (
  //   <View key={node.key} style={styles._VIEW_SAFE_paragraph}>
  //     {children}
  //   </View>
  // ),
  hardbreak: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.hardbreak}
      className={cn(defaultTextClassNames)}
    >
      {"\n"}
    </Text>
  ),
  softbreak: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.softbreak}
      className={cn(defaultTextClassNames)}
    >
      {"\n"}
    </Text>
  ),

  // Believe these are never used but retained for completeness
  pre: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_pre}>
      {children}
    </View>
  ),
  inline: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.inline}
      className={cn(defaultTextClassNames)}
    >
      {children}
    </Text>
  ),
  span: (node, children, parent, styles) => (
    <Text
      key={node.key}
      style={styles.span}
      className={cn(defaultTextClassNames)}
    >
      {children}
    </Text>
  ),
};

export default renderRules;
