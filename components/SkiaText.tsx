import {
  Canvas,
  Group,
  Text,
  TextPath,
  Skia,
  useFont,
  vec,
  Fill,
  useFonts,
  matchFont,
  Paragraph, TextAlign,
} from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

const size = 256;
const path = Skia.Path.Make();
path.addCircle(size, size, size/2);

export const HelloWorld = () => {
  const {width} = useWindowDimensions();
  const fontSize = 32;
  const font = useFont(require('../assets/fonts/Nanum-Kanginhan.ttf'), fontSize); // 폰트 설정
  const p = useMemo(() => {
    const builder = Skia.ParagraphBuilder.Make();
    builder.addText("대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다");
    builder.pushStyle({ fontFeatures: [], fontVariations: [], fontFamilies: ['Nanum-Kanginhan'], fontSize: fontSize, color: new Float32Array([0.0, 0.0, 1.0, 1.0])})
    return builder.build();
  }, []);
  const customFontMgr = useFonts({
    Kanginhan: [
      require('../assets/fonts/Nanum-Kanginhan.ttf')
    ]
  });

  const paragraph = useMemo(() => {
    // Are the font loaded already?
    if (!customFontMgr) {
      return null;
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center
    };
    const textStyle = {
      color: Skia.Color("black"),
      fontFamilies: ["Kanginhan"],
      fontSize: 50,
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText("대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다")
      .addText("Say Hello to ")
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 } })
      .addText("Skia 🎨")
      .pop()
      .build();
  }, [customFontMgr]);
  return (
      <Canvas style={{ flex: 1, width: width }}>
        <Fill color="white" />
        <Paragraph paragraph={paragraph} width={width-48} x={10} y={10} />
        {/*<Text x={10} y={50} font={font} text="대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다"></Text>*/}
        {/*<Group transform={[{ rotate: Math.PI }]} origin={vec(size, size)}>*/}
        {/*  <TextPath font={font} path={path} text="대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다" color={'black'} />*/}
        {/*</Group>*/}
      </Canvas>
  );
};
