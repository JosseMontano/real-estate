import { useRef } from 'react';
import { StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import { urls } from '../../core/constants/endpoint';
import { Location } from './createRealEstate';
type ParamsType = {
    setLocation:(val:Location)=>void
    setIsLoading:(val:boolean)=>void
}
export const SelectLocation = ({setLocation, setIsLoading}:ParamsType) => {
    const webViewRef = useRef(null);
    const mapUrl = urls.web + "select_address";

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "MAP_CLICK") {
        setLocation({
          lat:parsedData.location.lat,
          lng:parsedData.location.lng
        });
      }
    } catch (error) {
      console.error("Error parsing message:", error);
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
        <WebView
        ref={webViewRef}
        source={{ uri: mapUrl }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleWebViewMessage}
        onLoadEnd={() => setIsLoading(false)}
      />

    );
}
const styles = StyleSheet.create({
    webView: {
        height: 200,
        width: "96%",
      },
});