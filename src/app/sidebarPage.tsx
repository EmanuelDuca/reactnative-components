import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex flex-1 bg-white">
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View>
      <Text>Sidebar Page</Text>
    </View>
  );
}
