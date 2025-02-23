import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { RealEstate } from "../../shared/types/realEstate";
import Carousel from "./carousel";
import { useLanguageStore } from "../../core/store/language";
import { urls } from "../../core/constants/endpoint";
import WebView from "react-native-webview";
import { GeneralContainer } from "./generalContainer";
import { Questions } from "./questions";
import { Feedback } from "./feedback";
import useAuthStore from "../../core/store/auth";
import { User } from "../../core/store/user";
import { useState } from "react";
import { AnswerModal } from "./answerModal";
import { Question } from "./types/question";

type ParamsType = {};
export const RealEstatePage = ({}: ParamsType) => {
  const { language, texts } = useLanguageStore();
  const { user } = useAuthStore();
  const route = useRoute<RouteProp<{ RealEstate: RealEstate }, "RealEstate">>();
  const realEstate = route.params;
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const mapUrl = urls.web + "map/" + realEstate.lat_long;

  const handleOpenModal = (v: Question) => {
    setQuestion(v);
    setAnswerModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Carousel realEstate={realEstate} />
        <Text style={styles.title}>General</Text>
        <GeneralContainer v={realEstate} />

        <WebView
          source={{ uri: mapUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />

        <View style={styles.extraInfoContainer}>
          <Text style={[styles.title, { width: "100%" }]}>Preguntas</Text>
          <Questions
            user={user ?? ({} as User)}
            handleOpenModal={handleOpenModal}
            realEstate={realEstate}
          />
          <Text style={[styles.title, { width: "100%" }]}>Reseñas</Text>
          <Feedback />
        </View>
      </View>

      {question && user && (
        <AnswerModal
          setMainModalVisible={setAnswerModalVisible}
          mainModalVisible={answerModalVisible}
          question={question}
          realEstate={realEstate}
          user={user}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: "bold",
    width: "90%",
    alignSelf: "center",
  },
  webView: {
    height: 150,
    width: "90%",
    alignSelf: "center",
  },
  extraInfoContainer: {
    width: "90%",
    alignSelf: "center",
  },
});
