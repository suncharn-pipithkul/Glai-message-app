import React, { useState } from 'react';
import  { View, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const AvatarPicker = (props) => {
    // If the programmer provided source prop then used its uri (default avatar image).
    const [uri, setUri] = useState(props.defaultSource?.uri || undefined);

    const pickImage = async () => {
        try {
            // ask the user to pick an image
            const img = await ImageCropPicker.openPicker({
                width: props.dimension,
                height: props.dimension,
                cropping: true,
                cropperCircleOverlay: true,
            });

            setUri(img.path);
            props.onChange?.(img);

        } catch(err) {
            alert(err);
            console.log('@pickImage', err);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <ImageBackground
                // style={[
                //     props.style, 
                // {
                //     width: props.dimension,
                //     height: props.dimension,
                //     borderRadius: props.dimension / 2 >> 0, // integer division
                // }]}
                imageStyle={{borderRadius: props.dimension / 2 >> 0,}}
                {...props}
                // if new img is set change to that img. Otherwise, default img
                source={uri ? {uri} : props.defaultSource}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name='pluscircle' size={30} color='dimgray' style={styles.icon}/>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    icon: {
        opacity: 0.7,
    },
});
