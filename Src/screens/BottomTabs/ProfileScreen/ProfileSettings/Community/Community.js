import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Linking,ScrollView,Image } from 'react-native'
import { Colors, Images, Header, ResponsiveText } from '../../../../../components/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";



const Community = (props) => {
     
    const DATA = [
        { id: "1", title: "Website", subtitle: 'www.sizzlenetwork.io', image: Images.Wesite, url: 'https://google.com' },
        { id: "2", title: "Discord Channel", subtitle: 'discord.gg/sizzleofficial', image: Images.discordchannal, url: 'https://google.com'  },
        { id: "3", title: "Telegram Channel", subtitle: 'sizzleOfficial', image: Images.telegram, url: 'https://google.com'  },
        { id: "11", title: "Telegram Group", subtitle: 'sizzlecommunity', image: Images.telegram, url: 'https://google.com'  },
        { id: "4", title: "Twitter", subtitle: '@sizzle__', image: Images.twitter, url: 'https://google.com' },
        { id: "5", title: "Sizzle Network Instagram", subtitle: 'sizzle.io', image: Images.Instagram,url: 'https://google.com'  },
        { id: "6", title: "Facebook", subtitle: 'Facebok/sizle/....', image: Images.Facebook,url: 'https://google.com'  },
        { id: "7", title: "Youtube", subtitle: 'sizzle', image: Images.Youtube,url: 'https://google.com' },
        { id: "8", title: "Reddit", subtitle: 'r/sizzle', image: Images.Reddit,url: 'https://google.com'  },
        { id: "9", title: "Medium", subtitle: 'sizzle', image: Images.Medium, url: 'https://google.com'  },
        { id: "10", title: "Contract Address", subtitle: 'BSC Scan', image: Images.Bscscan,url: 'https://google.com' },
    
    ]
    
  return (
    <SafeAreaView style={styles.container}>

           <Header
                navigation={props.navigation}
                leftIcon={'chevron-left'}
                title={'Community'}
                textColor={'#000'}
            />
            <Text style={styles.connectText}>Connect with thousand of other Sizzle Network users to discuss and share anything about cryptocurrency knowledge. </Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {DATA.map((item) =>
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.cardContainer}>
                        <Image source={item.image} style={styles.imageStyle} />
                        <View style={{ flex: .8 }}>
                            <Text style={styles.headingText}>{item.title}</Text>
                            <Text style={styles.descText}>{item.subtitle}</Text>
                        </View>
                        <View style={styles.nextImageContainer}>
                            <Image source={Images.nextGray} style={styles.nextImage} />
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
  )
}

export default Community

const styles = StyleSheet.create({


    container: {
        flex: 1,
        marginHorizontal: wp(5)
    },
    connectText: {
        color: "#94959B",
        textAlign: "center",
        marginTop: wp(4),
        fontSize: wp(4)
    },
    cardContainer: {
        backgroundColor: 'gray',
        flexDirection: "row",
        borderRadius: 15,
        padding: wp(4),
        marginTop: wp(5),
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: wp(2)
    },
    imageStyle: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain",
        marginTop: wp(-2),
        marginRight: wp(2),
        borderRadius:100/2
    },
    headingText: {
        color: '#ffff',
        fontSize: wp(4.5),
    },
    descText: {
        color: "#F6F3F2",
        marginTop: wp(2),
        fontSize: wp(4)
    },
    nextImageContainer: {
        justifyContent: 'flex-end',
        flex: .2,
        alignItems: 'flex-end'
    },
    nextImage: {
        width: wp(4),
        height: wp(4),
        resizeMode: "contain",
        tintColor:'#ffff'
    }
})