import styled from 'styled-components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const FooterContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  /* background-color: #ffffff; */
  background-color: #002089dc;
  /* background-color: black; */
  /* border-radius: 15px; */
`;

export const LeftFooterIcon = styled(MaterialIcons)`
margin: 10px 10px 10px 15px;  /* top right bottom left */
/* background-color: yellowgreen; */
`;

export const FooterText = styled.Text`
    color: white;
    font-weight: bold;
`;
