import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { 
    SearchBarContainer, 
    SearchBarIconWrapper, 
    SearchBarInput } from '../styleComponents/MessagesStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const SearchBar2 = () => {
    const [searchText, setSearchText] = useState('');
    const input = useRef();

    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            <SearchBarContainer accessible activeOpacity={0.7} onPress={() => input.current.focus()}>
                <SearchBarIconWrapper accessible onPress={() => input.current.focus()}>
                    <MaterialIcons name="search" size={24} color="#808080" />
                </SearchBarIconWrapper>
                <SearchBarInput 
                    ref={input} 
                    placeholder='Search' 
                    returnKeyType='search' 
                    selectionColor='#c7e6ff'
                    onChangeText={text => setSearchText(text)}/>
                <SearchBarIconWrapper accessible onPress={() => input.current.clear()}>
                    <MaterialIcons name="cancel" size={18} color="#808080" />
                </SearchBarIconWrapper>
            </SearchBarContainer>
        </ScrollView>
    );
};