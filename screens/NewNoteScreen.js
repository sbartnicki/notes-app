import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const NewNoteScreen = (props) => {

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <AntDesign name="left" size={ 24 } color="black"
                           onPress={ () => props.navigation.navigate('Home Screen') }/>
            ),
            headerRight: () => (
                <Pressable onPress={ () => console.log('Save') }>
                    <Text>Save</Text>
                </Pressable>
            )
        });
    }, []);

    return (
        <View>
            <Text>NewNoteScreen Screen</Text>
        </View>
    )
}

export default NewNoteScreen;
