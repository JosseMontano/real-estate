import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { RealEstate } from "../../../shared/types/realEstate";
import { useNagigation } from "../../../core/hooks/useNavigation";
import { TrashIcon } from "../../../shared/icons/icons";
import useAuthStore from "../../../core/store/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../App";
import { handleDelete } from "../../../core/helpers/fetch";

type ParamsType = {
  v: RealEstate;
  showTrash?: boolean;
};

export const RealEstateImg = ({ v, showTrash = false }: ParamsType) => {
  const { handleRedirect } = useNagigation();
  const { removeFavorite, user } = useAuthStore();

  const { mutate: deleteFav } = useMutation({
    mutationFn: () =>
      handleDelete("favorite_real_estates", v.id + "/" + user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favs-real-estates", user?.id],
      });
      removeFavorite(v.id ?? 0);
    },
  });

  return (
    <Pressable
      onPress={() => {
        handleRedirect("RealEstate", v);
      }}
      style={styles.imageContainer}
    >
      <Image
        key={v.id}
        source={{
          uri: v.photos[0].image,
        }}
        style={styles.image}
      />
      {showTrash && (
        <Text onPress={() => deleteFav()} style={styles.trashIcon}>
          {TrashIcon}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "49%",
    height: 150,
    borderColor: "#212121",
    borderWidth: 0.7,
    position: "relative", // Necesario para posicionar el ícono de manera absoluta
  },
  image: {
    width: "100%",
    height: "100%",
  },
  trashIcon: {
    position: "absolute", // Posiciona el ícono de manera absoluta
    top: 5, // Ajusta la posición vertical
    right: 5, // Ajusta la posición horizontal
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semitransparente para mejor visibilidad
    borderRadius: 15, // Bordes redondeados
    padding: 5, // Espaciado interno
  },
});
