import {View, Text, Image, FlatList} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';

import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CountryFlag from 'react-native-country-flag';
import {
  Container,
  ResponsiveText,
  Header,
  Button,
  Images,
  InputField,
  GradientButton,
  Select,
} from '../../../components';
import React from 'react';
import styles from './styles';
import Colors from '../../../themes/colors';
import {recentPlayerData} from './dummyArray';

const PlayGame = props => {
  const recentPlayerView = ({item}) => {
    return (
      <View style={styles.recentPlayerItemContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{position: 'relative'}}>
            <Image source={item.image} style={styles.recentPlayerProfile} />
            <CountryFlag
              isoCode={item.cc}
              size={10}
              style={styles.recentPlayerCountryFlag}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <ResponsiveText style={styles.recentPlayerName}>
              {item.fName}
            </ResponsiveText>
            <ResponsiveText style={styles.recentPlayerName}>
              {item.lName}
            </ResponsiveText>
          </View>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
          <ResponsiveText style={styles.recentPlayerLgx}>
            {`${item.lgx} LGX`}
          </ResponsiveText>
          <ResponsiveText style={styles.recentPlayerUsdt}>
            {`${item.usdt} usdt`}
          </ResponsiveText>
        </View>
      </View>
    );
  };

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Play to Earn'}
        textColor={'#000'}
      />
      <ScrollView style={[styles.mainContainer]}>
        <View style={styles.gameDetailContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#591B7B', '#8A2280']}
            style={styles.linearGradientContainer}>
            <View style={{marginTop: 15}}>
              <View style={styles.carouselGameCardContainer}>
                <Image
                  source={Images.littleNightmare}
                  style={styles.heroGameImage}
                />
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.1)',
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(0, 0, 0,1)',
                  ]}
                  style={styles.heroGameText}>
                  <ResponsiveText style={styles.heroGameTitle}>
                    {'Little Nightmares II'}
                  </ResponsiveText>
                  <ResponsiveText style={styles.heroGameAward}>
                    {'Playing Rewards 15 LGX per Play'}
                  </ResponsiveText>
                </LinearGradient>
              </View>
            </View>
            <View style={{marginVertical: 15}}>
              <Button
                title={'Play'}
                onPress={{}}
                titleStyle={{fontSize: 4.5, color: '#6F1F7A'}}
                btnContainer={styles.playButton}
              />
            </View>
          </LinearGradient>
          <View style={styles.gameDetailStatsContainer}>
            <View style={styles.statsItemContainer}>
              <ResponsiveText style={styles.statsTitle}>
                {'LGX Earned'}
              </ResponsiveText>
              <ResponsiveText style={styles.statsValue}>
                {'400 LGX'}
              </ResponsiveText>
            </View>
            <View style={styles.statsItemContainer}>
              <ResponsiveText style={styles.statsTitle}>
                {'Total Paid Out'}
              </ResponsiveText>
              <ResponsiveText style={styles.statsValue}>
                {'1.5K LGX'}
              </ResponsiveText>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <ResponsiveText style={styles.gameDetailsSectionTitle}>
              {'About Game'}
            </ResponsiveText>
            <ResponsiveText style={styles.gameDetailsDescription}>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in cillum dolore eu fugiat nulla pariatur.'
              }
            </ResponsiveText>
            <GradientButton
              onPress={() => props.navigation.navigate('Withdraw')}
              title={'Go To Daily Challenge'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginTop: 40,
              }}
              gradientColor={['#591B7B', '#8A2280']}
              shadowColor="#ebb9e8"
            />
            <View style={{marginTop: 30, marginBottom: 15}}>
              <ResponsiveText style={styles.gameDetailsDescription}>
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
                }
              </ResponsiveText>
            </View>
          </View>
          <View>
            <View style={styles.recentPlayerHeader}>
              <ResponsiveText style={styles.gameDetailsSectionTitle}>
                {'Recent Player'}
              </ResponsiveText>
              <ResponsiveText style={styles.gameDetailsSectionSubTitle}>
                {'Total Earned'}
              </ResponsiveText>
            </View>
            <View>
              <FlatList data={recentPlayerData} renderItem={recentPlayerView} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default PlayGame;
