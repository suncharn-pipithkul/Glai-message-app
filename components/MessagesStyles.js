import styled from 'styled-components';


export const Container = styled.View`
  flex: 1;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  align-items: center;
  background-color: #ffffff;
  box-shadow: 10px 5px 5px black;
`;

export const Card = styled.TouchableOpacity`
    width: 100%;
    /* background-color: red; */
    /* margin-top: 5px; */
    border-radius: 15px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    /* background-color: skyblue; */
    width: 100%;
    border-radius: 15px;
    /* justify-content: space-between; */
`;

export const UserImgWrapper = styled.View`
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    align-self: center;
    background-color: crimson;
    border-radius: 15px;
    /* width: 20%; */
`;

export const UserImg = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 35px;
`;

export const MiddleTextWrapper = styled.View`
    /* background-color: antiquewhite; */
    border-radius: 10px;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`;

export const UserName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #444444;
`;

export const MessageText = styled.Text`
    font-size: 14px;
    color: #525252;
`;

export const EndTextWrapper = styled.View`
    /* background-color: yellowgreen; */
    border-radius: 5px;
    padding: 15px;
    align-self: flex-end;

`;

export const SendAtText = styled.Text`
    font-size: 14px;
    color: #525252;
`;

export const MainTextWrapper = styled.View`
    background-color: peru;
    border-radius: 5px;
    /* width: 80%; */
    justify-content: center;
    align-self: stretch;
`;

export const TopTextWrapper = styled.View`
    background-color: yellowgreen;
    border-radius: 5px;
    padding-right: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export const BottomTextWrapper = styled.View`
    background-color: antiquewhite;
    border-radius: 5px;
    margin-top: 3px;
`;