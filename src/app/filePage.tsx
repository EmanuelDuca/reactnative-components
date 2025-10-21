import {
  Button,
  ButtonText,
  FileKey2,
  Heading,
  Image,
  Trash,
  Upload,
  User,
} from "@usekeyhole/nativewind";
import { IFile } from "@usekeyhole/utils";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileLabel,
} from "~/components/file/file-nativewind";

/* import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileLabel,
} from "@usekeyhole/web"; */

export default function Page() {
  return (
    <View className="w-full h-full bg-background">
      <ScrollView>
        <Content />
      </ScrollView>
    </View>
  );
}

function FileWeb() {
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
    <View className="flex flex-col gap-5 p-5">
      <View className="w-[444px]">
        <File noDrag onFilesAdded={handleFilesAdded}>
          <FileIcon className="size-8">
            <User />
          </FileIcon>
          <FileContent>
            <FileLabel>Upload document</FileLabel>
            <FileDescription>
              Drag and drop or browse from your device.
            </FileDescription>
          </FileContent>
          <FileIcon
            onPress={() => {
              console.log("Icon was pressed.");
            }}
          >
            <Upload />
          </FileIcon>
        </File>
      </View>

      <View className="w-[444px]">
        <File onFilesAdded={handleFilesAdded} size="large" variant="failed">
          <FileIcon>
            <FileKey2 />
          </FileIcon>
          <FileContent>
            <FileLabel>Failed to analyze the uploaded document</FileLabel>
            <FileDescription>
              Drag and drop or browse from your device.
            </FileDescription>
          </FileContent>
          <FileButtons>
            <Button color="brand">
              <ButtonText>Add manually</ButtonText>
            </Button>
            <Button>
              <ButtonText>Browse files</ButtonText>
            </Button>
          </FileButtons>
        </File>
      </View>
    </View>
  );
}

function Content() {
  return (
    <View className="flex flex-col gap-5 h-full w-full p-4">
      <Heading>File Nativewind</Heading>
      <View className="w-[444px]">
        <File>
          <FileIcon className="size-8">
            <User />
          </FileIcon>
          <FileContent>
            <FileLabel>Upload document</FileLabel>
            <FileDescription>
              Drag and drop or browse from your device.
            </FileDescription>
          </FileContent>
          <FileIcon
            onPress={() => {
              console.log("Icon was pressed.");
            }}
          >
            <Upload />
          </FileIcon>
        </File>
      </View>

      <View className="w-[444px]">
        <File>
          <FileIcon className="size-8">
            <Image
              className="h-[100px]"
              contentPosition="top center"
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/b/b0/NewTux.svg",
              }}
            />
          </FileIcon>
          <FileContent>
            <FileLabel>User Image</FileLabel>
            <FileDescription>emanoil-duca-image.png</FileDescription>
          </FileContent>
          <FileIcon
            onPress={() => {
              console.log("Icon was pressed.");
            }}
          >
            <Trash />
          </FileIcon>
        </File>
      </View>

      <View className="w-[444px]">
        <File size="large" variant="failed">
          <FileIcon>
            <FileKey2 />
          </FileIcon>
          <FileContent>
            <FileLabel>Failed to analyze the uploaded document</FileLabel>
            <FileDescription>
              Drag and drop or browse from your device.
            </FileDescription>
          </FileContent>
          <FileButtons>
            <Button color="brand">
              <ButtonText>Add manually</ButtonText>
            </Button>
            <Button>
              <ButtonText>Browse files</ButtonText>
            </Button>
          </FileButtons>
        </File>
      </View>
    </View>
  );
}
