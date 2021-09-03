import styled from 'styled-components';


export const Container = styled.View`
  flex: 1;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
    width: 100%;
    /* background-color: #ddd; */
    /* margin-top: 5px; */
    border-radius: 15px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    /* background-color: skyblue; */
    /* justify-content: space-between; */
`;

export const UserImgWrapper = styled.View`
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    align-self: center;
    /* background-color: red; */
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const TextWrapper = styled.View`
    /* background-color: antiquewhite; */
    width: 75%;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const MessageText = styled.Text`
    font-size: 14px;
    color: #333333;
`;