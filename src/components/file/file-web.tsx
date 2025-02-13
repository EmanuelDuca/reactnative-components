import * as React from "react";
import { Dropzone, DropzoneProps } from "../dropzone/dropzone";
import { useControllableState } from "@usekeyhole/hooks";
import {
  File as FileNativewind,
  FileProps as FileNativewindProps,
  FileButtons,
  FileButtonsProps,
  FileContent,
  FileContentProps,
  FileDescription,
  FileDescriptionProps,
  FileIcon,
  FileIconProps,
  FileLabel,
  FileLabelProps,
} from "./file-nativewind";

/* -------------------------------------------------------------------------------------------------
 * File
 * -----------------------------------------------------------------------------------------------*/

type FileProps = FileNativewindProps &
  Pick<DropzoneProps, "noClick" | "noDrag" | "onFilesAdded">;

const File: React.FC<FileProps> = ({
  className,
  size = "base",
  hovered: isHovered,
  variant = "default",
  onFilesAdded,
  noClick,
  noDrag,
  disabled,
  ...props
}) => {
  const [hovered, setHovered] = useControllableState({
    prop: isHovered,
    defaultProp: false,
  });
  return (
    <div
      onMouseEnter={() => {
        if (!disabled) setHovered?.(true);
      }}
      onMouseLeave={() => {
        if (!disabled) setHovered?.(false);
      }}
    >
      <Dropzone
        noClick={!!noClick}
        noDrag={!!noDrag}
        onFilesAdded={onFilesAdded}
      >
        <FileNativewind
          disabled
          size={size}
          hovered={hovered}
          variant={variant}
          className={className}
          {...props}
        />
      </Dropzone>
    </div>
  );
};

export default File;

/* -------------------------------------------------------------------------------------------------
 * Export Components
 * -----------------------------------------------------------------------------------------------*/

export {
  File,
  FileProps,
  FileIcon,
  FileIconProps,
  FileContent,
  FileContentProps,
  FileLabel,
  FileLabelProps,
  FileDescription,
  FileDescriptionProps,
  FileButtons,
  FileButtonsProps,
};
