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
import { Image, ScrollView, Text, View, ViewComponent } from "react-native";
import {
  File,
  FileButtons,
  FileContent,
  FileDescription,
  FileIcon,
  FileLabel,
} from "~/components/file/file-web";
import { IFile } from "@usekeyhole/utils";

export default function Page() {
  return (
    <ScrollView>
      <View className="flex flex-1 bg-white dark:bg-black">
        <Content />
      </View>
    </ScrollView>
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

  React.useEffect(() => {
    console.log(files.length);
  }, [files]);

  return (
    <View className="flex-1 flex-col gap-3 bg-white dark:bg-neutral-900 p-20">
      <Text>Base size</Text>
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File disabled onFilesAdded={handleFilesAdded}>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <Button
              size="icon-sm"
              variant="ghost"
              onPress={() => {
                console.log("Icon was pressed.");
              }}
            >
              <FileIcon>
                <Upload />
              </FileIcon>
            </Button>
          </File>
        </View>
        <View className="w-[444px]">
          <File noDrag onFilesAdded={handleFilesAdded} hovered>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <Button
              size="icon-sm"
              variant="ghost"
              onPress={() => {
                console.log("Icon was pressed.");
              }}
            >
              <FileIcon>
                <Upload />
              </FileIcon>
            </Button>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
      </View>
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File noClick onFilesAdded={handleFilesAdded} variant="destructive">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileIcon>
              <Upload />
            </FileIcon>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
        <View className="w-[444px]">
          <File
            noClick
            onFilesAdded={handleFilesAdded}
            variant="destructive"
            hovered
          >
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileIcon>
              <Upload />
            </FileIcon>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
      </View>
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} variant="failed">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileIcon>
              <Upload />
            </FileIcon>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} variant="failed" hovered>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileIcon>
              <Upload />
            </FileIcon>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
      </View>
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} variant="uploading">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Document</FileLabel>
              <FileDescription>Uploading.....</FileDescription>
            </FileContent>
            <Button
              size="icon"
              variant="ghost"
              onPress={() => {
                console.log("Icon was pressed.");
              }}
            >
              <FileIcon>
                <Upload />
              </FileIcon>
            </Button>
          </File>
        </View>
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} variant="uploading" hovered>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Document is uploading</FileLabel>
              <FileDescription>75% -------------____ 100%</FileDescription>
            </FileContent>
            <FileIcon>
              <Upload />
            </FileIcon>
            {/*  <FileButtons>
              <Button>
                <ButtonText>add file</ButtonText>
              </Button>
            </FileButtons> */}
          </File>
        </View>
      </View>
      <Text>Large size</Text>
      <View className="flex w-fit flex-row gap-3">
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} size="large">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
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
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} size="large" hovered>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
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
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} size="large">
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileButtons>
              <Button color="brand-soft">
                <ButtonText>Add manually</ButtonText>
              </Button>
              <Button>
                <ButtonText>Browse files</ButtonText>
              </Button>
            </FileButtons>
          </File>
        </View>
        <View className="w-[444px]">
          <File onFilesAdded={handleFilesAdded} size="large" hovered>
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Upload document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <FileButtons>
              <Button color="brand-soft">
                <ButtonText>Add manually</ButtonText>
              </Button>
              <Button>
                <ButtonText>Browse files</ButtonText>
              </Button>
            </FileButtons>
          </File>
        </View>
      </View>
      <View className="flex flex-row w-fit gap-3">
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
        <View className="w-[444px]">
          <File
            onFilesAdded={handleFilesAdded}
            size="large"
            variant="failed"
            hovered
          >
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
      <View className="flex flex-row w-fit gap-3">
        <View className="w-[444px]">
          <File
            onFilesAdded={handleFilesAdded}
            size="large"
            variant="uploading"
          >
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Document is uploading</FileLabel>
              <FileDescription>75% -------------____ 100%</FileDescription>
            </FileContent>
            <Button>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </File>
        </View>
        <View className="w-[444px]">
          <File
            onFilesAdded={handleFilesAdded}
            size="large"
            variant="uploading"
            hovered
          >
            <FileIcon>
              <FileKey2 />
            </FileIcon>
            <FileContent>
              <FileLabel>Failed to analyze the uploaded document</FileLabel>
              <FileDescription>
                Drag and drop or browse from your device.
              </FileDescription>
            </FileContent>
            <Button>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </File>
        </View>
      </View>
      {/*       <View className=" flex flex-row w-full">
        <View className="w-2/3 border rounded-xl border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <Dropzone onFilesAdded={handleFilesAdded}>
            <View className="px-4 py-3 flex flex-row items-center gap-3">
              <FileIcon className="dark:stroke-neutral-100">
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
      </View> */}
    </View>
  );
}
