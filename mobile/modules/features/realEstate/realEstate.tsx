import React, { useState } from 'react';
import { PhotoRes, RealEstate } from '../../shared/types/realEstate';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native';

type ParamsType = {};

const { width: screenWidth } = Dimensions.get('window');

export const RealEstatePage = ({}: ParamsType) => {
  const route = useRoute<RouteProp<{ RealEstate: RealEstate }, 'RealEstate'>>();
  const realEstate = route.params;

  // Track loading state for each image
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleLoadStart = (id: number) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadEnd = (id: number) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={realEstate.photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  slide: {
    width: screenWidth - 60,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative', // Needed for absolute positioning of the loader
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loaderContainer: {
    position: 'absolute', // Position the loader over the image
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  },
});

export default RealEstatePage;