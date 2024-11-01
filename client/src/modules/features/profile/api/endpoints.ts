
import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import { RealEstateDTO } from "./dtos";
import {
  db,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";
import { updateDoc } from "firebase/firestore";

export async function addREToDB(
  realEstatData: RealEstateDTO,
  user: User,
  imgs: string[],
  typeRE: TypeRE
) {
  const realestate: RealEstate = {
    address: realEstatData.address ?? "",
    amountBathroom: realEstatData.amountBathroom,
    amountBedroom: realEstatData.amountBedroom,
    description: {
      es: realEstatData.descriptionEs,
      en: realEstatData.descriptionEn ?? "",
      pt: realEstatData.descriptionPt ?? "",
    },
    latLong: realEstatData.latLong ?? "",
    price: realEstatData.price,
    squareMeter: realEstatData.squareMeter,
    title: {
      es: realEstatData.titleEs,
      en: realEstatData.titleEn ?? "",
      pt: realEstatData.titlePt ?? "",
    },
    available: true,
    userId: user.id ?? "",
    user: user,
    images: imgs,
    typeRE: typeRE,
    typeREId: typeRE.id ?? "",
  };

  await addDoc(collection(db, "realEstates"), realestate);
}

export async function fetchTypesRE(): Promise<TypeRE[]> {
  const querySnapshot = await getDocs(collection(db, "type_real_estates"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TypeRE[];
}

export async function updateUserInDB() {
  const docRef = doc(db, "users", "UBdwtIm1iyoM1klyNZDV");
  //update user

  const user: User = {
    email: "eljosema501@gmail.com",
    available: true,
    cellphoneNumber: "123456789",
    codeRecuperation: "123456",
    qualification: 5,
    role: 1,
    userName: "jhack1",
  };
  try {
    await updateDoc(docRef, user);

    // Update the related comments
    const collectionRefComments = collection(db, "comments");
    const qComments = query(collectionRefComments, where("commentatorId", "==", "UBdwtIm1iyoM1klyNZDV"));
    const querySnapshotComments = await getDocs(qComments);

    // Update each comment asynchronously
    await Promise.all(
      querySnapshotComments.docs.map((commentDoc) =>
        updateDoc(commentDoc.ref, {
          "commentator.email": user.email,
          "commentator.userName": user.userName,
          "commentator.qualification": user.qualification,

        })
      )
    );
  } catch (error) {
    console.error("Error updating document:", error);
  }
}
