import React, { useState, useRef } from 'react';
import { PhotoRes, RealEstate } from '../../shared/types/realEstate';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

type ParamsType = {};

const { width: screenWidth } = Dimensions.get('window');

export const RealEstatePage = ({}: ParamsType) => {
  const route = useRoute<RouteProp<{ RealEstate: RealEstate }, 'RealEstate'>>();
  const realEstate = route.params;

  // Track loading state for each image
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  // Track the current active index for pagination dots
  const [activeIndex, setActiveIndex] = useState(0);

  // Reference to the FlatList for controlling scroll
  const flatListRef = useRef<FlatList>(null);

  const handleLoadStart = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadEnd = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: PhotoRes }) => {
    const isLoading = loadingStates[item.id] || false;

    return (
      <View style={styles.slide}>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#0000ff" /> {/* Loader for each image */}
          </View>
        )}
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onLoadStart={() => handleLoadStart(item.id)}
          onLoadEnd={() => handleLoadEnd(item.id)}
          onError={() => handleLoadEnd(item.id)} // Handle errors
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    width: screenWidth, // 100% width
    height: 300, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    position: 'relative', // Needed for absolute positioning of pagination dots
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
  paginationContainer: {
    position: 'absolute', // Position absolutely within the slide
    bottom: 16, // Position at the bottom of the image
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Take full width to center the dots
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0000ff', // Active dot color
  },
  inactiveDot: {
    backgroundColor: '#ccc', // Inactive dot color
  },
});

export default RealEstatePage;