import {
  Button,
  ButtonText,
  FileKey2,
  Text,
  Upload,
} from "@usekeyhole/nativewind";
import { IFile } from "@usekeyhole/utils";
import React from "react";
import { Pressable, View } from "react-native";
import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileLabel,
} from "~/components/file/file-web";

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
      setFiles((existing) =>
        existing.concat(
          addedFiles.map((file) => ({
            ...file,
            id: crypto.randomUUID(),
            loading: false,
          }))
        )
      );
    }, 1000);
  };

  return (
    <View className="space-y-6">
      <File onFilesAdded={handleFilesAdded} noClickEventsBubbling noClick>
        <FileIcon>
          <Upload />
        </FileIcon>
        <FileContent>
          <FileLabel>Upload a file</FileLabel>
          <FileDescription>Click upload or drag & drop.</FileDescription>
        </FileContent>
      </File>

      {files.map((file) => (
        <File key={file.id} noClick noClickEventsBubbling variant="success">
          <FileContent>
            <FileLabel>
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  window.open(
                    `${process.env.EXPO_PUBLIC_API_URL}/public/files/${file.id}`,
                    "_blank"
                  );
                }}
              >
                <Text className="underline text-blue-700">{file.name}</Text>
              </Pressable>
            </FileLabel>
            <FileDescription>{file.size} bytes</FileDescription>
          </FileContent>
        </File>
      ))}
    </View>
  );
}
