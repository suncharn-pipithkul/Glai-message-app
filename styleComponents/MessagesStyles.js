import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  /* background-color: #2089dc; */
  /* background-color: black; */
  /* border-radius: 15px; */
`;

export const Card = styled.TouchableOpacity`
    padding-left: 5px;
    padding-right: 5px;
    /* background-color: yellowgreen; */
    /* border-radius: 15px; */
`;

export const UserInfo = styled.View`
    flex-direction: row;
    /* background-color: peru; */
    /* border-radius: 25px; */
`;

export const UserImgWrapper = styled.View`
    padding: 10px;
    align-self: center;
    justify-content: center;
    /* background-color: crimson; */
    /* border-radius: 20px; */
`;

export const UserImg = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 35px;
`;

export const MainTextWrapper = styled.View`
    flex: 1;
    /* justify-content: space-around; */
    justify-content: space-evenly;

    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    /* border-bottom-width: 1px; */
    border-bottom-color: #cccccc;
    /* background-color: skyblue; */
    border-radius: 10px;
`;

export const TextAlignWrapper = styled.View`
    flex: 1;
    justify-content: center;
`;

export const TopTextWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    /* background-color: forestgreen; */
    /* border-radius: 5px; */
`;

export const UserName = styled.Text`
    width: 70%;
    font-size: 18px;
    font-weight: bold;
    color: #444444;
    /* background-color: burlywood; */
`;

export const SendAtText = styled.Text`
    font-size: 14px;
    color: #ababab;
    /* background-color: blanchedalmond; */
`;

export const RightTagWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-content: center;
    /* background-color: red; */
`;

export const FriendText = styled.Text`
    padding: 3px 0px;
    margin-right: 12px;
    font-size: 14px;
    color: #525252;
    /* background-color: bisque; */
`;

export const CheckIcon = styled(Ionicons)`
    margin-right: 4px;
    /* background-color: yellowgreen; */
`;

export const BottomTextWrapper = styled.View`
    /* background-color: antiquewhite; */
    /* border-radius: 5px; */
`;

export const MessageText = styled.Text`
    width: 80%;
    font-size: 14px;
    color: #525252;
`;

export const SearchBarContainer = styled.TouchableOpacity`
    /* flex: 1; */
    flex-direction: row;

    min-height: 40px;
    margin: 8px 16px 8px 16px;  /* top right bottom left */
    padding: 8px 16px 8px 16px;
    border-radius: 40px;

    background-color: #eee;
    align-items: center;
`;

export const SearchBarIconWrapper = styled.TouchableOpacity`
    /* background-color: skyblue; */
`;

export const SearchBarInput = styled.TextInput`
    flex: 1;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 16px;

    /* background-color: red; */
`;

export const SectionHeaderWrapper = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0px 16px 0px 16px;
`;

export const SectionHeader = styled.View`
    border-radius: 20px;
    opacity: 0.1;
    border-bottom-color: #2089DC;
    border-bottom-width: 12px;
`;
