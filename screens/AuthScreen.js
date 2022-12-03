import { View, Text, Pressable } from "react-native";

const AuthScreen = (props) => {
    return (
        <View>
            <Text>Auth Page</Text>
            <Pressable
                onPress={() => props.navigation.navigate('Note Details')}
            >
                <Text>Go to Note Details</Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('Notes List')}
            >
                <Text>Go to Notes List page</Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('New Note')}
            >
                <Text>Go to New Note page</Text>
            </Pressable>
        </View>
    )
}

export default AuthScreen;
