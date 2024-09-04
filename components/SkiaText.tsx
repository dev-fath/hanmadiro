import {
  Canvas,
  Skia,
  Fill,
  useFonts,
  Paragraph, TextAlign,
} from "@shopify/react-native-skia";
import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { HelloWave } from "@/components/HelloWave";

const size = 256;
const path = Skia.Path.Make();
path.addCircle(size, size, size/2);

const fullText = '대한민국의... 아저씨..는.. 이런..,글씨체,,를, 좋아한다,,.';
const welcomeText = 'Say Hello to Skia 🎨'

export const HelloWorld = () => {
  const {width,height} = useWindowDimensions();
  const [currentText, setCurrentText] = useState("");
  const [currentWelcomeText, setCurrentWelcomeText] = useState("");
  const [allTextRendered, setAllTextRendered] = useState(false);
  const [showHelloWave, setShowHelloWave] = useState(false);


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
      .pop()
      .build();
  }, [currentText, customFontMgr]);

  const paragraph2 = useMemo(() => {
    // Are the font loaded already?
    if (!customFontMgr) {
      return null;
    }

    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 }, color: Skia.Color("blue") })
      .addText(currentWelcomeText)
      .pop()
      .build();
  }, [currentWelcomeText, customFontMgr]);

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
  }, []);



  useEffect(() => {
    if(allTextRendered){
      let index = 0;
      setCurrentWelcomeText('');
      const intervalId = setInterval(() => {
        if (index < welcomeText.length) {
          setCurrentWelcomeText((prev) => prev + welcomeText[index]);
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

  return (
    <>
      <Canvas style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: width, height: height }}>
        <Fill color="white" />
        <Paragraph paragraph={paragraph} width={width-48} x={24} y={height/5} />
        {
          allTextRendered &&
          <Paragraph paragraph={paragraph2} width={width} x={10} y={height*2/3} />
        }
      </Canvas>
      {
        showHelloWave && <HelloWave />
      }
    </>
  );
};
