import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { 
    SearchBarContainer, 
    SearchBarIconWrapper, 
    SearchBarInput } from '../styleComponents/MessagesStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const input = useRef();

    return (
        <SearchBarContainer accessible activeOpacity={0.7} onPress={() => input.current.focus()}>
            <SearchBarIconWrapper 
                accessible
                accessibleLabel='confirm search'
                onPress={() => input.current.focus()}>
                <MaterialIcons name="search" size={24} color="#808080" />
            </SearchBarIconWrapper>
            <SearchBarInput 
                ref={input} 
                placeholder='Search' 
                returnKeyType='search'
                onChangeText={text => setSearchText(text)}/>
            {searchText ?
                <SearchBarIconWrapper
                    accessible
                    accessibleLabel='Clear search'
                    onPress={() => {
                        setSearchText('');
                        input.current.clear();
                    }}>
                    <MaterialIcons name="cancel" size={18} color="#808080" />
                </SearchBarIconWrapper> : null
            }
        </SearchBarContainer>
    );
};