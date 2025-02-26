import React, { useState, useRef } from "react";
import { PhotoRes, RealEstate } from "../../shared/types/realEstate";
import { Linking } from "react-native";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text, // Make sure Text is imported
} from "react-native";

type ParamsType = {
  realEstate: RealEstate;
};

const { width: screenWidth } = Dimensions.get("window");

export const Carousel = ({ realEstate }: ParamsType) => {
  // Track loading state for each image
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // Track the current active index for pagination dots
  const [activeIndex, setActiveIndex] = useState(0);

  // Reference to the FlatList for controlling scroll
  const flatListRef = useRef<FlatList>(null);

  const handleLoadStart = (id: number) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadEnd = (id: number) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const handleImagePress = (item: PhotoRes) => {
    const url = item.image; // URL de la imagen

  const encodedUrl = encodeURIComponent(url);

  const redirectUrl = `http://192.168.1.6:5173/#/img360/${encodedUrl}`;

  console.log("Redirect URL:", redirectUrl);

  // Abre la URL en el navegador
  Linking.openURL(redirectUrl).catch((err) =>
    console.error("Failed to open URL:", err)
  );
  };

  const renderItem = ({ item }: { item: PhotoRes }) => {
    const isLoading = loadingStates[item.id] || false;

    return (
      <View style={styles.slide}>
        {isLoading && (
          <Text style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#0000ff" />{" "}
            {/* Loader for each image */}
          </Text>
        )}
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePress(item)}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            onLoadStart={() => handleLoadStart(item.id)}
            onLoadEnd={() => handleLoadEnd(item.id)}
            onError={() => handleLoadEnd(item.id)} // Handle errors
          />
        </TouchableOpacity>
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {realEstate.photos.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => {
                flatListRef.current?.scrollToIndex({ index, animated: true });
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <FlatList
        ref={flatListRef}
        data={realEstate.photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensure smooth scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  slide: {
    width: screenWidth, // 100% width
    height: 300, // Adjust height as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    position: "relative", // Needed for absolute positioning of pagination dots
  },
  imageContainer: {
    width: "100%", // Match the width of the image
    height: "100%", // Match the height of the image (adjust as needed)
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  loaderContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  },
  paginationContainer: {
    position: "absolute", // Position absolutely within the slide
    bottom: 16, // Position at the bottom of the image
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Take full width to center the dots
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0000ff", // Active dot color
  },
  inactiveDot: {
    backgroundColor: "#ccc", // Inactive dot color
  },
});

export default Carousel;
