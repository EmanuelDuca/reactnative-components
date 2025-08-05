import * as React from "react";
import { Dropzone, DropzoneProps, DropzoneRef } from "../dropzone/dropzone";
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
} from "@usekeyhole/nativewind";

/* -------------------------------------------------------------------------------------------------
 * File
 * -----------------------------------------------------------------------------------------------*/

type LiftedDropzoneProps =
  | "noClick"
  | "noDrag"
  | "onFilesAdded"
  | "noDragEventsBubbling"
  | "noClickEventsBubbling";

type FileProps = FileNativewindProps &
  Pick<DropzoneProps, LiftedDropzoneProps> & {
    dropzoneOptions?: Omit<DropzoneProps, LiftedDropzoneProps | "children">;
  };

type FileRef = DropzoneRef;

const File = React.forwardRef<FileRef, FileProps>(
  (
    {
      // @ts-ignore ts not allowing classnames for some reason
      className,
      size = "base",
      hovered: isHovered,
      variant = "default",
      onFilesAdded,
      noClick,
      noDrag,
      disabled,
      noDragEventsBubbling,
      noClickEventsBubbling,
      dropzoneOptions,
      ...props
    },
    ref
  ) => {
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
          {...dropzoneOptions}
          ref={ref}
          noClick={!!noClick}
          noDrag={!!noDrag}
          onFilesAdded={onFilesAdded}
          noClickEventsBubbling={noClickEventsBubbling}
          noDragEventsBubbling={noDragEventsBubbling}
        >
          <FileNativewind
            disabled
            size={size}
            hovered={hovered}
            variant={variant}
            // @ts-ignore ts not allowing classnames for some reason
            className={className}
            {...props}
          />
        </Dropzone>
      </div>
    );
  }
);

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
