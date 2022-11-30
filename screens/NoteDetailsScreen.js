import { View, Text, Pressable } from "react-native";

const NoteDetailsScreen = (props) => {
    return (
        <View>
            <Text>NoteDetailsScreen Screen</Text>
            <Pressable
                onPress={() => props.navigation.navigate('Log In Page')}
            >
                <Text>Go to Auth Page</Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('Notes List')}
            >
                <Text>Go to Notes List page</Text>
            </Pressable>
        </View>
    )
}

export default NoteDetailsScreen;
