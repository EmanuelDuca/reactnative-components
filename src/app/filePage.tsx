import {
  Button,
  ButtonText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileKey2,
  KeySquare,
  Star,
  Upload,
} from "@usekeyhole/nativewind";
import * as React from "react";
import { Image, Text, View, ViewComponent } from "react-native";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/newToggleVariant/toggle-group";
import {
  Toggle,
  ToggleIcon,
  ToggleText,
} from "@/components/newToggleVariant/toggle";
import {
  File,
  FileContent,
  FileDescription,
  FileIcon,
  FileIconAction,
  FileLabel,
} from "@/components/file/file";
import { FilesCard, FilesCardHeading } from "@usekeyhole/ui";
import { IFile } from "@usekeyhole/utils";
import { getDocumentAsync } from "expo-document-picker";
import { Dropzone } from "@/components/dropzone/dropzoneV2";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Content />
    </View>
  );
}

function Content() {
  const [files, setFiles] = React.useState<IFile<string | undefined>[]>([]);

  const handleFilesAdded = (addedFiles: IFile<string | undefined>[]) => {
    addedFiles.forEach((f) => {
      f.loading = true;
      f.isDeletable = true;
    });

    setTimeout(() => {
      // simulate uploading files and then setting the id of the added files
      setFiles((files) =>
        files.map((file) => {
          if (file.id === undefined) {
            return {
              ...file,
              id: crypto.randomUUID(),
              loading: false,
            };
          }

          return file;
        })
      );
    }, 1000);

    setFiles([...files, ...addedFiles]);
  };

  return (
    <View className="flex-1 flex-col gap-3 bg-red-50 dark:bg-neutral-900 p-20">
      <View className="flex flex-row w-fit gap-3">
        <View>
          <File className="bg-white">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileIconAction>
              <Upload />
            </FileIconAction>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
        <View className="border w-fit h-fit rounded-xl border-neutral-200 bg-white">
          <Dropzone onFilesAdded={handleFilesAdded}>
            <View className="px-4 py-3 flex flex-row items-center gap-3">
              <FileIcon>
                <FileKey2 />
              </FileIcon>
              <FileContent>
                <FileLabel>Dropzone</FileLabel>
                <FileDescription>
                  Drag and drop or browse from your device.
                </FileDescription>
              </FileContent>
            </View>
          </Dropzone>
        </View>
      </View>
      <View className=" flex flex-row w-full">
        <View className="w-2/3 border rounded-xl border-neutral-200 dark:border-red-500 bg-white dark:bg-neutral-900">
          <Dropzone onFilesAdded={handleFilesAdded}>
            <View className="px-4 py-3 flex flex-row items-center gap-3">
              <FileIcon>
                <FileKey2 />
              </FileIcon>
              <FileContent>
                <FileLabel>Dropzone</FileLabel>
                <FileDescription>
                  Drag and drop or browse from your device.
                </FileDescription>
              </FileContent>
            </View>
          </Dropzone>
        </View>
      </View>
    </View>
  );
}
