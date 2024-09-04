import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { HelloWorld } from "@/components/SkiaText";

export default function HomeScreen() {
  const {width,height} = useWindowDimensions();

  return (
    <ThemedView style={styles.content} >
      <View style={{flex:1, width: width, justifyContent: 'center', alignItems: 'center', height: height}}>
        <HelloWorld />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
