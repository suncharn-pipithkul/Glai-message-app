import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


export default function OnBoardScreen( { navigation }) {

    const NextButton = ({...props}) => (
        <TouchableOpacity style={{marginHorizontal:20}} {...props}>
            <Text style={{fontSize:16}}>Next</Text>
        </TouchableOpacity>
    )

    const SkipButton = ({...props}) => (
        <TouchableOpacity style={{marginHorizontal:20}} {...props}>
            <Text style={{fontSize:16}}>Skip</Text>
        </TouchableOpacity>
    )

    const DoneButton = ({...props}) => (
        <TouchableOpacity style={{marginHorizontal:20}} {...props}>
            <Text style={{fontSize:16}}>Get Started</Text>
        </TouchableOpacity>
    )

    return (
        <Onboarding
            NextButtonComponent={NextButton}
            SkipButtonComponent={SkipButton}
            DoneButtonComponent={DoneButton}
            onSkip={() => navigation.navigate('Login')}
            onDone={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-img-world.png')} />,
                    title: 'Crossplatform chat',
                    subtitle: 'Log in with your facebook, Google, or your email',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-img-phone.png')} />,
                    title: 'Connect with people',
                    subtitle: 'Chat with your friends and make new friends!',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/onboarding-img-bag.png')} />,
                    title: 'It\'s in the bag',
                    subtitle: 'We\'re done here bois',
                },
            ]}
        />
    );
}