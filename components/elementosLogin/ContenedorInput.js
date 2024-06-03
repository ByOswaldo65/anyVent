import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const ContenedorInput = ({ labelText, placeholderText, onChangeHeight, password, id}) => {
    const [inputHeight, setInputHeight] = useState(0);

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{labelText}</Text>
            <TextInput
                style={[styles.input, { height: inputHeight }]}
                placeholder={placeholderText}
                placeholderTextColor="#cdcdcd"
                id={id}
                multiline={false}
                secureTextEntry={password}
                onContentSizeChange={(event) => {
                    setInputHeight(event.nativeEvent.contentSize.height);
                    if (onChangeHeight) {
                        onChangeHeight(event.nativeEvent.contentSize.height);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#fdfdfd',
        marginBottom: 8,
        marginLeft: 18,
    },
    input: {
        borderColor: '#fdfdfd',
        borderWidth: 1,
        borderRadius: 100,
        paddingLeft: 18,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fdfdfd',
        paddingTop: 12,
        paddingBottom: 12,
    }
});

export default ContenedorInput;