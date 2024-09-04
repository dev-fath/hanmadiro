import {
  Canvas,
  Skia,
  useFonts,
  Paragraph, TextAlign, LinearGradient, vec, Rect,
} from "@shopify/react-native-skia";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import Ionicons from "@expo/vector-icons/Ionicons";

const size = 256;
const path = Skia.Path.Make();
path.addCircle(size, size, size/2);

const fullText = '대한민국의... 아저씨..는.. 이런..,글씨체,,를, 좋아한다,,.근데... 더,, 길어지면..,. 어떻게 하나..!';
const welcomeText = '\n\n\nSay Hello to Skia 🎨'

export const HelloWorld = () => {
  const {width,height} = useWindowDimensions();
  const [currentText, setCurrentText] = useState("");
  const [allTextRendered, setAllTextRendered] = useState(false);
  const [showHelloWave, setShowHelloWave] = useState(false);

  const [skiaKey, setSkiaKey] = useState(0);

  const onClickRefresh = () => {
    setSkiaKey(prevState => prevState + 1);
    setCurrentText("")
    setAllTextRendered(false)
    setShowHelloWave(false)
  }



  const customFontMgr = useFonts({
    Kanginhan: [
      require('../assets/fonts/Nanum-Kanginhan.ttf')
    ]
  });


  const paragraphStyle = {
    textAlign: TextAlign.Center
  };

  const textStyle = {
    color: Skia.Color("black"),
    fontFamilies: ["Kanginhan"],
    fontSize: 50,
  };

  const paragraph = useMemo(() => {
    // Are the font loaded already?
    if (!customFontMgr) {
      return null;
    }

    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText(currentText)
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 }, color: Skia.Color("blue") })
      .pop()
      .build();
  }, [currentText, customFontMgr]);

  useEffect(() => {
    let index = 0;
    setCurrentText('');
    setAllTextRendered(false)
    setShowHelloWave(false)
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setAllTextRendered(true)
        }, 300)
      }
    }, 100); // 100ms 간격으로 한 글자씩 추가

    return () => clearInterval(intervalId);
  }, [skiaKey]);



  useEffect(() => {
    if(allTextRendered){
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < (welcomeText.length)) {
          setCurrentText((prev) => prev + welcomeText[index]);
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            setShowHelloWave(true)
          }, 500)
        }
      }, 100); // 100ms 간격으로 한 글자씩 추가
      return () => clearInterval(intervalId);
    }
  }, [allTextRendered]);

  const gradientColors = ["#ffecdb", "#ffccc3"]; // 시작과 끝 컬러
  const start = vec(0, 0); // 그라데이션 시작점 (좌상단)
  const end = vec(width, height); // 그라데이션 끝점 (우하단)


  return (
    <Fragment key={skiaKey}>
      {showHelloWave &&
        <View style={{ position: 'absolute', top: 50, justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
          <Pressable onPress={onClickRefresh} style={{backgroundColor: '#eee', borderRadius: 9999, width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons size={28} name={'refresh-sharp'} />
          </Pressable>
        </View>
      }
        <Canvas style={{flex:1, width: width, height: height}}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={start}
              end={end}
              colors={gradientColors}
            />
          </Rect>
          <Paragraph paragraph={paragraph} width={width-48} x={24} y={height/5} />
          {/*<Fill />*/}
        </Canvas>
      <View style={{position: 'absolute', zIndex: 100, bottom: 50, justifyContent: 'center', alignItems: 'center'}}>
        {
          showHelloWave && <HelloWave />
        }
      </View>
    </Fragment>
  );
};
