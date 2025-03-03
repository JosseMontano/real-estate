import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import useGet from "../../../core/hooks/useGet";
import { handleGet, handlePost } from "../../../core/helpers/fetch";
import { Comment } from "../../../shared/types/comment";
import { RealEstate } from "../../../shared/types/realEstate";
import { useLanguageStore } from "../../../core/store/language";
import { StarIcon } from "../../../shared/icons/icons";
import { Empty } from "../../../core/components/empty";
import { z } from "zod";
import { useMemo } from "react";
import { useForm } from "../../../core/hooks/useForm";
import useAuthStore from "../../../core/store/auth";
import { New } from "./new";

type ParamsType = {
  realEstate: Readonly<RealEstate>;
};

export const Feedback = ({ realEstate }: ParamsType) => {
  const { language, texts } = useLanguageStore();

  const { data: comments } = useGet({
    services: () => handleGet<Comment[]>("comments/" + realEstate?.id),
    queryKey: ["comments-by-readl-estate", realEstate?.id],
    itemsPerPage: 100,
    valueToService: realEstate?.id,
  });

  return (
    <View style={{gap:10, marginBottom:10}}>
      <New realEstate={realEstate}/>

      {comments?.map((v) => (
        <View key={v.id} style={styles.card}>
          <View>
            <Image style={styles.image} source={{ uri: v.commentator.photo }} />
          </View>
          <View style={styles.content}>
            <Text style={[{ fontSize: 17, fontWeight: "700" }]}>
              {v.commentator.email}
            </Text>

            <Text style={[{ fontSize: 12, fontWeight: "500" }]}>
              {v.comment[language]}
            </Text>

            <View style={styles.footer}>
              <Text style={[{ fontSize: 11, fontWeight: "500" }]}>
                {v.amount_star}
              </Text>
              <Text>
                <StarIcon size={12} />
              </Text>
            </View>
          </View>
        </View>
      ))}

      {comments?.length === 0 && <Empty />}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  content: {
    flexDirection: "column",
    gap: 1,
  },
  footer: {
    flexDirection: "row",
    gap: 3,
  },
});
