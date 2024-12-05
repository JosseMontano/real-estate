import { StyleSheet, Text, View, Image } from 'react-native';
import { ModalComp } from '../../core/components/modal';
import { useLanguageStore } from '../../core/store/language';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
type ParamsType = {
    mainModalVisible:boolean
    setMainModalVisible:(v:boolean)=>void
}
export const ModalConfig = ({mainModalVisible, setMainModalVisible}:ParamsType) => {
    const { texts, language, setLanguage } = useLanguageStore();
  
  
    const data = [
      { label: texts.spanishConfig, value: "es" },
      { label: texts.englishConfig, value: "en" },
      { label: texts.portugueseConfig, value: "pt" },
    ];

    return (
        <ModalComp
        setVisible={setMainModalVisible}
        title={texts.titleModalConfig}
        visible={mainModalVisible}
        children={
          <View>
            <Text>{texts.titleConfig}:</Text>
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              value={language}
              onChange={(val:any)=>setLanguage(val.value)}
            />
          </View>
        }
      />
    );
}
const styles = StyleSheet.create({

});