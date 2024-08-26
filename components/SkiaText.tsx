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
  Paragraph
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
    return builder.build();
  }, []);

  return (
      <Canvas style={{ flex: 1, width: '100%' }}>
        <Fill color="white" />
        <Text x={10} y={50} font={font} text="대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다"></Text>
        <Paragraph paragraph={p} width={width-48} x={0} y={0}r/>
        {/*<Group transform={[{ rotate: Math.PI }]} origin={vec(size, size)}>*/}
        {/*  <TextPath font={font} path={path} text="대충 길게 한번 찌끄려보는 한글을 더 길게 써보면 어떻게 되는지 한번 보고싶다" color={'black'} />*/}
        {/*</Group>*/}
      </Canvas>
  );
};
