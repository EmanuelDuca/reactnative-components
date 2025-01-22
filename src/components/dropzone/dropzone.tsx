import * as React from "react";
import { Text, View, ViewProps, ViewStyle, Style } from "react-native";
import { DropzoneOptions, useDropzone } from "react-dropzone";

import { cn, IFile, IS_WEB, theme } from "@usekeyhole/utils";

type DropzoneProps = ViewProps &
  Omit<DropzoneOptions, "onDropAccepted"> & {
    onFilesAdded: (files: IFile<undefined>[]) => void;
    activeText?: string;
    activeMultipleText?: string;
    windowDragText?: string;
    windowDragMultipleText?: string;
    children: React.ReactNode;
  };

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesAdded,
  activeText = "Drop file here",
  activeMultipleText = "Drop files here",
  windowDragText = "Drop file here",
  windowDragMultipleText = "Drop files here",
  className,
  children,
  ...dropzoneOptions
}) => {
  if (!IS_WEB) return children;

  const [isWindowDragOver, setIsWindowDragOver] = React.useState(false);

  const [isDraggingMultiple, setIsDraggingMultiple] = React.useState(false);

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

  if (!disabled) {
    if (isDragActive) {
      opacity = 0.8;
      text = isDraggingMultiple ? activeMultipleText : activeText;
    } else if (isWindowDragOver) {
      opacity = 0.6;
      text = isDraggingMultiple ? windowDragMultipleText : windowDragText;
    }
  }

  const forceToOpen = true;

  return (
    <View className="flex w-full h-full">
      <View
        {...getRootProps()}
        className="flex-1 w-full h-full items-center justify-center relative"
      >
        {/* Border */}
        <View
          className={cn(
            isDragActive || isWindowDragOver ? "opacity-100" : "opacity-0",
            "z-20 pointer-events-none absolute w-full h-full border-2 border-dashed rounded-xl border-neutral-900 dark:border-white"
          )}
        />

        {/* White Background Overlay */}
        <View
          className={cn(
            isDragActive || isWindowDragOver ? "opacity-80" : "opacity-0",
            "absolute w-full h-full bg-white z-10 rounded-xl pointer-events-none"
          )}
        />

        {/* File Input */}
        <input {...getInputProps()} />

        {/* Text Overlay */}
        <Text
          className={`absolute uppercase text-center font-bold transition-opacity z-20 ${
            text ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </Text>

        {/* Content (always visible below the overlay) */}
        <View>{children}</View>
      </View>
    </View>
  );
};
