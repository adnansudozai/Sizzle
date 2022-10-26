

import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    FlatList,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { Container, Images, Header, ResponsiveText } from '../../../../components/index';
import { getall_notiication } from '../../../../Api/Api';
import styles from './styles';
import { useSelector } from 'react-redux';

const Notification = props => {
    const [loading, setLoading] = useState(false);
    const [notification, setnotification] = useState([]);
    let data=useSelector(state => state.userdataReducer)

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
    const getnotifications=async()=>{
      
      
    try {
        
        await getall_notiication(data.barerToken)
    .then((res) => {
        console.log('res====',res)
        setnotification(res.data.notifications)
    
    
    })
    
    } catch (error) {
        console.log('catch error',error);
        setloading(false)
    
    }
    
          
            
        
    
    }
    useEffect(()=>{
        getnotifications()
    },[])

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
                        source={item.attributes.image_url?item.attributes.image_url: Images.settingicon}
                        style={{
                            height: 35,
                            width: 35,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={{ borderWidth: 0,width:widthPercentageToDP(85) }}>
                    <View style={styles.mainview}>
                        <View style={styles.headingview}>
                            <ResponsiveText style={styles.headingtext}>
                                {item.attributes.title}
                            </ResponsiveText>
                        </View>

                        <View style={styles.dateview}>
                            <ResponsiveText style={styles.explanationtext}>
                                {item.attributes.created_at.slice(0,10)}
                            </ResponsiveText>
                        </View>
                    </View>



                    
                    <View style={{ marginTop: 3 }}>
                        <ResponsiveText
                            style={{
                                ...styles.explanationtext,
                                marginLeft: 10,
                            }}>
                            {item.attributes.description}
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
                        data={notification}
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
