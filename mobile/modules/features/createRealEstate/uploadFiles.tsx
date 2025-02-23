import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { urls } from '../../core/constants/endpoint';
import WebView from 'react-native-webview';

interface Params{
  setUploadedFiles:(val:[])=>void
  user:string
}

const UploadFilesWebView = ({setUploadedFiles, user}:Params) => {
  const webViewRef = useRef(null);

  const [webViewHeight, setWebViewHeight] = useState(100); // Initial height

  const handleWebViewMessage = (event:any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'FILES_UPLOADED') {
        setUploadedFiles(parsedData.files);
      } else if (parsedData.type === 'CONTENT_HEIGHT') {
        // Update WebView height based on content height
        setWebViewHeight(parsedData.height);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const injectedJS = `
    // Function to send uploaded files to React Native
    const sendUploadedFiles = (files) => {
      const event = {
        type: 'FILES_UPLOADED',
        files: files
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(event));
    };

    // Function to send content height to React Native
    const sendContentHeight = () => {
      const height = document.documentElement.scrollHeight;
      const event = {
        type: 'CONTENT_HEIGHT',
        height: height
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(event));
    };

    // Listen for changes in the uploadedFiles state
    let previousFiles = [];
    const interval = setInterval(() => {
      const currentFiles = window.uploadedFiles;
      if (currentFiles && currentFiles.length !== previousFiles.length) {
        previousFiles = currentFiles;
        sendUploadedFiles(currentFiles);
        sendContentHeight(); // Send height after files are updated
      }
    }, 1000);

    // Initial height calculation
    sendContentHeight();
  `;

  return (
    <View>
      <WebView
        ref={webViewRef}
        source={{ uri: urls.web + 'upload_files/' +user}}
        style={[styles.webView, { height: webViewHeight }]} // Set dynamic height
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleWebViewMessage}
        onLoadEnd={() => {
          // Recalculate height after WebView finishes loading
          webViewRef.current.injectJavaScript(`
            sendContentHeight();
          `);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    minHeight: 50, // Minimum height
  },
});

export default UploadFilesWebView;