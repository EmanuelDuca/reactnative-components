import * as React from "react";
import { Text, useColorScheme, View, ViewProps, ViewStyle } from "react-native";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { cn, IFile, IS_WEB, theme } from "@usekeyhole/utils";

export type DropzoneProps = ViewProps &
  Omit<DropzoneOptions, "onDropAccepted"> & {
    onFilesAdded: (files: IFile<undefined>[]) => void;
    baseColor?: string;
    activeDragColor?: string;
    windowDragColor?: string;
    activeText?: string;
    activeMultipleText?: string;
    windowDragText?: string;
    windowDragMultipleText?: string;
    children: React.ReactNode;
    style?: ViewStyle;
  };

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesAdded,
  baseColor = "transparent",
  windowDragColor = "#171717",
  activeDragColor = "#171717",
  activeText = "Drag and drop file here",
  activeMultipleText = "Drag and drop files here",
  windowDragText = "Drag and drop file here",
  windowDragMultipleText = "Drag and drop files here",
  style,
  className,
  children,
  ...dropzoneOptions
}) => {
  if (!IS_WEB) return children;

  const [containerSize, setContainerSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [isWindowDragOver, setIsWindowDragOver] = React.useState(false);

  const [isDraggingMultiple, setIsDraggingMultiple] = React.useState(false);

  const colorScheme = useColorScheme(); // Detect light or dark mode

  const { getRootProps, getInputProps, isDragActive, draggedFiles } =
    useDropzone({
      multiple: false,
      ...dropzoneOptions,
      onDropAccepted: (file) => {
        setTimeout(() => {
          onFilesAdded(
            file.map((f) => ({
              key: crypto.randomUUID(),
              id: undefined,
              uri: "",
              name: f.name,
              fileName: f.name,
              mimeType: f.type,
              size: f.size,
              webFile: f,
            }))
          );
        }, 240);
      },
    });

  React.useEffect(() => {
    const handleEnterWindow = (e: DragEvent) => {
      const isDraggingFiles = e.dataTransfer?.types.includes("Files");
      const amountOfFiles =
        e.dataTransfer?.items.length ||
        e.dataTransfer?.files.length ||
        draggedFiles.length ||
        0;

      const isAllowedAmountOfFiles =
        dropzoneOptions.multiple || amountOfFiles === 1;

      setIsDraggingMultiple(amountOfFiles > 1);

      if (isDraggingFiles && isAllowedAmountOfFiles) {
        setIsWindowDragOver(true);
      }
    };

    const handleLeaveWindow = (e: DragEvent) => {
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setIsWindowDragOver(false);
      }
    };

    const handleDrop = () => {
      setIsWindowDragOver(false);
    };

    window.addEventListener("dragenter", handleEnterWindow);
    window.addEventListener("dragleave", handleLeaveWindow);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleEnterWindow);
      window.removeEventListener("dragleave", handleLeaveWindow);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const disabled = Boolean(
    dropzoneOptions.disabled ||
      (!dropzoneOptions.multiple && isDraggingMultiple)
  );

  let opacity = 1;
  let text = null;
  let color = baseColor;

  if (!disabled) {
    if (isDragActive) {
      color = activeDragColor;
      text = isDraggingMultiple ? activeMultipleText : activeText;
    } else if (isWindowDragOver) {
      color = windowDragColor;
      text = isDraggingMultiple ? windowDragMultipleText : windowDragText;
    }
  }

  return (
    <View
      className={cn("flex-1 w-full h-full", className)}
      onLayout={(e) => {
        setContainerSize(e.nativeEvent.layout);
      }}
    >
      <div
        {...getRootProps()}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 0.24s ease-in-out",
        }}
      >
        {/* White Background Overlay */}
        <View
          className={cn(
            isDragActive || isWindowDragOver ? "opacity-80" : "opacity-0",
            "absolute w-full h-full bg-white dark:bg-neutral-900 z-10 rounded-xl pointer-events-none transition-colors"
          )}
        />

        {/* File Input */}
        <input {...getInputProps()} />

        {/* Border SVG */}
        <svg
          width={containerSize.width}
          height={containerSize.height}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            transition:
              "color 0.24s ease-in-out, background-color 0.24s ease-in-out, opacity 0.24s ease-in-out",
            color,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <rect
            x="0.5"
            y="0.5"
            rx="12"
            ry="12"
            width={containerSize.width - 1}
            height={containerSize.height - 1}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 6"
            strokeDashoffset="18"
            style={{
              pointerEvents: "none",
            }}
          />
        </svg>

        {/* Text Overlay */}
        <Text
          className={cn(
            "stroke-neutral-900 dark:stroke-white absolute text-neutral-800 dark:text-neutral-100 uppercase italic text-2xl text-center font-bold transition-opacity z-20",
            text ? "opacity-100" : "opacity-0"
          )}
        >
          {text}
        </Text>

        {/* Content */}
        {children}
      </div>
    </View>
  );
};
