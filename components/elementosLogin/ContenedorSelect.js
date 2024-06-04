import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

const ContenedorSelect = ({ labelText, options, selectedValue, onValueChange }) => {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{labelText}</Text>
            <View style={styles.selectPickerWrapper}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.selectPicker}
                >
                    {options.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
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
    selectPickerWrapper: {
        borderColor: '#fdfdfd',
        borderWidth: 1,
        borderRadius: 100,
        paddingLeft: 18,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: 0,
        paddingBottom: 0,
    },
    selectPicker: {
        color: '#fdfdfd',
        fontSize: 16,          
    }
});

export default ContenedorSelect;
