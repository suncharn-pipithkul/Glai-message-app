import React, { useState } from 'react';
import  { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImageCropPicker,  { ImageOrVideo } from 'react-native-image-crop-picker';

export const AvatarPicker = (props) => {
    // If the programmer provided source prop then used its uri (default avatar image).
    const [uri, setUri] = useState(props.source?.uri || undefined);

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
            <Image
                style={{
                    width: props.dimension,
                    height: props.dimension,
                    borderRadius: props.dimension / 2 >> 0, // integer division
                }}
                {...props}
                // if new img is set change to that img. Otherwise, default img
                source={uri ? {uri} : props.source}
            />
        </TouchableOpacity>
    );
};
