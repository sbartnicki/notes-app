import { View, Text, Pressable, StyleSheet, Image, SafeAreaView, TextInput } from "react-native";
import Styles from "../styles";
import { Entypo, FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const NoteDetailsScreen = ({ route, navigation }) => {
    let soundObject = null;

    /**
     * Function name: playRecord
     * Purpose: Plays a record
     * */
    const playRecord = async () => {
        if (!route.params.note.audioURI) {
            return
        }

        const sound = new Audio.Sound();

        try {
            await sound.loadAsync({ uri: route.params.note.audioURI });
            await sound.playAsync();

            soundObject = sound;
        } catch (e) {
            console.log('error: ', e);
        }
    };

    /**
     * Function name: stopPlayingRecord
     * Purpose: Stops playing a record
     * */
    const stopPlayingRecord = async () => {
        try {
            await soundObject.stopAsync();
        } catch (e) {
            console.log('error: ', e);
        }
    }

    /**
     * Function name: speechContent
     * Purpose: Content reading
     * */
    const speechContent = () => {
        Speech.speak(route.params.note.content);
    }

    React.useEffect(() => {
        return soundObject
            ? () => {
                soundObject.unloadAsync();
            }
            : undefined;
    }, [soundObject]);

    return (
        <View style={ Styles.wrapper }>
            <View style={styles.navBar}>
                <Pressable
                    onPress={() =>
                        navigation.navigate('Notes List', {
                            userId: route.params.userId,
                        })
                    }
                    style={styles.navButton}
                >
                    <Ionicons name="chevron-back" size={32} color="#283618" />
                    <Text style={styles.navText}>BACK</Text>
                </Pressable>
            </View>
            <View style={styles.innerWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{ route.params.note.title }</Text>
                    <Pressable onPress={speechContent}>
                        <SimpleLineIcons name="speech" size={24} color="black" />
                    </Pressable>
                </View>
                <Text style={styles.content}>{ route.params.note.content }</Text>
                {
                    route.params.note.imageURI &&
                    <Image style={styles.image} source={{ width: '100%', height:200, uri: route.params.note.imageURI }}></Image>
                }
                {
                    route.params.note.audioURI &&
                    <View style={styles.audioControls}>
                        <Pressable style={styles.audioControl} onPress={ playRecord }>
                            <Entypo name="controller-play" size={40} color="black" />
                            <Text>Play</Text>
                        </Pressable>
                        <Pressable style={styles.audioControl} onPress={ stopPlayingRecord }>
                            <Entypo name="controller-stop" size={40} color="black" />
                            <Text>Stop</Text>
                        </Pressable>
                    </View>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    innerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        backgroundColor: '#dda15e',
        borderRadius: 4,
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#283618',
    },
    content: {
        color: '#fff',
        textAlignVertical: 'top',
        width: '100%'
    },
    audioControls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    audioControl: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 20
    },
    image: {
        marginVertical: 20,
        borderRadius: 10
    },
    navBar: {
        marginLeft: -15,
        marginRight: -15,
        marginTop: 50,
        marginBottom: 15,
        padding: 8,
        backgroundColor: '#FEFAE0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navText: {
        color: '#283618',
        fontWeight: '900',
    },
    titleWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20
    }
})

export default NoteDetailsScreen;
