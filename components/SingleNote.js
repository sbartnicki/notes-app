import { View, StyleSheet, Text, Image, Pressable } from 'react-native';

const Note = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.onItemPress();
      }}
    >
      <View style={styles.noteWrapper}>
        <Text style={styles.header}>{props.title}</Text>
        <Text style={styles.content}>{props.content}</Text>
        <View style={styles.indicators}>
          {props.isAudio && <Image source={require('../assets/play.png')} />}
          {props.isImage && <Image source={require('../assets/image.png')} />}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noteWrapper: {
    backgroundColor: '#DDA15E',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    color: '#283618',
    fontWeight: '900',
    fontSize: 20,
  },
  content: {
    color: '#FEFAE0',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Note;
