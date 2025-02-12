import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import { urls } from "../../core/constants/endpoint";

const UploadFilesWebView = () => {
  //  const nameFolder = email.split("@")[0];
  const webViewRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "FILES_UPLOADED") {
        console.log("Uploaded Files:", parsedData.files);
        setUploadedFiles(parsedData.files);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
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

    // Listen for changes in the uploadedFiles state
    let previousFiles = [];
    const interval = setInterval(() => {
      const currentFiles = window.uploadedFiles;
      if (currentFiles && currentFiles.length !== previousFiles.length) {
        previousFiles = currentFiles;
        sendUploadedFiles(currentFiles);
      }
    }, 1000);
  `;

  return (
    <View>
      <WebView
        ref={webViewRef}
        source={{ uri: urls.web + "#/upload_files/alejandra" }}
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
    minHeight: 100,
    maxHeight: "auto",
  },
});

export default UploadFilesWebView;
