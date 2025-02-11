import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

type ParamsType = {};

export const CreateRE = ({}: ParamsType) => {
  const mapUrl = "http://192.168.1.7:5173/select_address";
  const webViewRef = useRef(null);

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'MAP_CLICK') {
        console.log('Location:', parsedData.location);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const injectedJS = `
    // Wait for the map to be fully loaded before attaching event
    const interval = setInterval(() => {
      if (window.L && window.myMap) {
        clearInterval(interval);
        window.myMap.on('click', function (e) {
          const mapClickEvent = {
            type: 'MAP_CLICK',
            location: { lat: e.latlng.lat, lng: e.latlng.lng }
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(mapClickEvent));
        });
      }
    }, 500);
  `;

  return (
    <View style={{ flex: 1 }}>
      <Text>Map Viewer</Text>
      <WebView
        ref={webViewRef}
        source={{ uri: mapUrl }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    height: 200,
    width: '96%',
  },
});
