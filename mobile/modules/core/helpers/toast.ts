import Toast from "react-native-toast-message";


export const handleToast = (msg:string, title:string)=>{
    Toast.show({
        type: 'success',
        text1: title,
        text2: msg
      });
}