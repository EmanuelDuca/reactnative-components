import React from "react";
import { Image, View } from "react-native";

function ImagesDenamrk() {
  return (
    <View className="flex-1">
      <Image
        source={require("./denmark.png")} // Adjust path as necessary
        style={{ width: "100%", height: "100%" }} // Set the image to 100x100 pixels
        resizeMode="cover"
      />
    </View>
  );
}

export default ImagesDenamrk;
