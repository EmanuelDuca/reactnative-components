/* -------------------------------------------------------------------------------------------------
 * MasterFile
 * -----------------------------------------------------------------------------------------------*/

import { View } from "react-native";
import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileLabel,
  FileProps,
} from "./file-web";
import { Button, ButtonText, FilePen, X } from "@usekeyhole/nativewind";
import { IFile } from "@usekeyhole/utils";
import React from "react";

type MasterFileProps = FileProps;

const MasterFile: React.FC<MasterFileProps> = () => {
  const [files, setFiles] = React.useState<IFile<string | undefined>[]>([]);
  const [fileVariant, setFileVariant] =
    React.useState<Pick<FileProps, "variant">["variant"]>("default");
  const [progress, setProgress] = React.useState(0);
  const [fileStatus, setFileStatus] = React.useState<boolean>(false);
  const [tryNumber, setTryNumber] = React.useState<number>(1);

  const startUpload = () => {
    setFileVariant("uploading");
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 90) {
        clearInterval(interval);
        setTimeout(() => {
          if (number < 3) {
            setFileVariant("failed");
          } else {
            setFileStatus(true);
          }
        }, 1000);
      }
    }, 300);
    const number = tryNumber + 1;
    setTryNumber(number);
  };

  const handleFilesAdded = (addedFiles: IFile<string | undefined>[]) => {
    startUpload();
    setFiles([...files, ...addedFiles]);
  };
  return (
    <View>
      <File onFilesAdded={handleFilesAdded}>
        <FileIcon>
          <FilePen />
        </FileIcon>
        <FileContent>
          <FileLabel>Rental Agreement</FileLabel>
          <FileDescription>mentro-rental-agreement.pdf</FileDescription>
        </FileContent>
        <FileButtons>
          <Button size={"sm"}>
            <ButtonText>Add appendix</ButtonText>
          </Button>
        </FileButtons>
        <FileIcon>
          <X />
        </FileIcon>
      </File>
    </View>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Export Components
 * -----------------------------------------------------------------------------------------------*/
