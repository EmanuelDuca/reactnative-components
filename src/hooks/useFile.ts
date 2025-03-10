import { FileProps } from "@/components/file/file-nativewind";
import { IFile } from "@usekeyhole/utils";
import React from "react";

export function useFile() {
  const [files, setFiles] = React.useState<IFile<string | undefined>[]>([]);
  const [fileVariant, setFileVariant] =
    React.useState<Pick<FileProps, "variant">["variant"]>("default");
  const [fileStatus, setFileStatus] = React.useState<boolean>(false);

  const startUpload = () => {
    setFileVariant("uploading");

    const interval = setInterval(() => {}, 3000);
    setFileVariant("default");
    setFileStatus(true);
    return [];
  };
}
