import { View, Text, Pressable } from "react-native";

const NotesListScreen = (props) => {
    return (
        <View>
            <Text>NotesListScreen Screen</Text>
            <Pressable
                onPress={() => props.navigation.navigate('Log In Page')}
            >
                <Text>Go to Auth Page</Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('Note Details')}
            >
                <Text>Go to Note detail page</Text>
            </Pressable>
        </View>
    )
}

export default NotesListScreen;
