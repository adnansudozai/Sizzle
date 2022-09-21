

import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    FlatList,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Images, Header, ResponsiveText } from '../../../../components/index';
import styles from './styles';
const Notification = props => {
    const [loading, setLoading] = useState(false);

    let notidata = [
        {
            heading: 'Add your card or account',
            icons: Images.cardicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Jun 2021',
        },
        {
            heading: 'Update Available',
            icons: Images.settingicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Jun 2021',
        },
        {
            heading: 'Add your card or account',
            icons: Images.cardicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Jun 2021',
        },
        {
            heading: 'Add your card or account',
            icons: Images.cardicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Jun 2021',
        },
        {
            heading: 'Update Available',
            icons: Images.settingicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Jun 2022',
        },
        {
            heading: 'Add your card or account',
            icons: Images.cardicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '10 Jun 2021',
        },
        {
            heading: 'Update Available',
            icons: Images.settingicon,
            explanation: 'Now you an add unlimited cards adn accounts...',
            date: '20 Feb 2021',
        },
    ];


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.mainnotifications}>
                <View
                    style={{
                        borderWidth: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <Image
                        source={item.icons}
                        style={{
                            height: 35,
                            width: 35,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={{ borderWidth: 0 }}>
                    <View style={styles.mainview}>
                        <View style={styles.headingview}>
                            <ResponsiveText style={styles.headingtext}>
                                {item.heading}
                            </ResponsiveText>
                        </View>

                        <View style={styles.headingview}>
                            <ResponsiveText style={styles.explanationtext}>
                                {item.date}
                            </ResponsiveText>
                        </View>
                    </View>
                    <View style={{ marginTop: 3 }}>
                        <ResponsiveText
                            style={{
                                ...styles.explanationtext,
                                marginLeft: 10,
                            }}>
                            {item.explanation}
                        </ResponsiveText>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <Container backgroundColor={'white'}>
            <View style={styles.conntainer}>
                <Header
                    navigation={props.navigation}
                    leftIcon={'chevron-left'}
                    title={'Notification'}
                    textColor={'#000'}
                />
                <View style={styles.viewimg}>
                    {/* <Image source={Images.verticaldots} style={styles.leftarrow} /> */}
                </View>

                <View style={{ marginTop: 20, paddingBottom: hp(5) }}>
                    <FlatList
                        data={notidata}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </Container>
    );
};

export default Notification;
