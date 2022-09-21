import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Container, ResponsiveText, Header, Images} from '../../../components';
import Colors from '../../../themes/colors';
import styles from './styles';
import {gamelistDATA} from './dummyArray';

const Arcadia = props => {
  const [gameCardLayout, setGameCardLayout] = useState('carousel');
  const [selectedTab, setSelectedTab] = useState(0);

  const headerView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={Images.profileImage} style={styles.headerProfile} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#6F1F7A',
                borderRadius: 3,
                padding: 1.5,
              }}>
              <Icons name="game-controller" size={10} color="#fff" />
            </View>
            <ResponsiveText
              style={{
                marginLeft: 5,
                fontSize: 3.7,
                fontWeight: 'bold',
                color: '#6F1F7A',
              }}>
              {'LEGION ARCADIA'}
            </ResponsiveText>
          </View>
          <ResponsiveText
            style={{
              fontSize: 5.3,
              fontWeight: '700',
              color: Colors.balckText,
            }}>
            {'BARRY PRICE'}
          </ResponsiveText>
        </View>
      </View>
    );
  };

  const tabMenuItemView = (item, index) => {
    if (index === selectedTab) {
      return (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#591B7B', '#8A2280']}
          style={styles.tabLinearGradientContainer}
          key={item}>
          <ResponsiveText numberOfLines={1} style={{color: Colors.BtnText}}>
            {item}
          </ResponsiveText>
        </LinearGradient>
      );
    } else
      return (
        <Pressable
          onPress={() => setSelectedTab(index)}
          key={item}
          style={{marginRight: 35}}>
          <ResponsiveText numberOfLines={1} style={{color: '#000'}}>
            {item}
          </ResponsiveText>
        </Pressable>
      );
  };

  const gameCardView = (item, navigation) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Playgame')}
        activeOpacity={0.8}>
        <View style={styles.carouselGameCardContainer}>
          <Image source={item.image} style={styles.carouselGameImage} />
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.7)',
              'rgba(0, 0, 0,1)',
            ]}
            style={styles.carouselGameText}>
            <ResponsiveText style={styles.carouselGametitle} numberOfLines={1}>
              {item.title}
            </ResponsiveText>
            <ResponsiveText style={styles.carouselGameSubtitle}>
              {`Playing Rewards ${item.award} per Play`}
            </ResponsiveText>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  const gameListView = (item, navigation) => {
    return (
      <View style={styles.gameListContainer}>
        <Image source={item.image} style={styles.gameListAvatar} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 15,
          }}>
          <ResponsiveText style={styles.gameListTitle}>
            {item.title}
          </ResponsiveText>
          <ResponsiveText style={styles.gameListSubTitle}>
            {`Playing Rewards ${item.award} per Play`}
          </ResponsiveText>
        </View>
        <TouchableOpacity
          style={{marginLeft: 8}}
          onPress={() => navigation.navigate('Playgame')}>
          <Icon name={'chevron-right'} size={35} color={'#6F1F7A'} />
        </TouchableOpacity>
      </View>
    );
  };

  const handleCardLayout = () => {
    setGameCardLayout(gameCardLayout === 'list' ? 'carousel' : 'list');
  };

  const tabOptions = ['Play to Earn', 'Daily Challenge', 'Upcoming'];

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        titleView={headerView}
        textColor={'#000'}
        rightIcon={gameCardLayout === 'list' ? 'view-carousel' : 'view-list'}
        righIconOnPress={handleCardLayout}
        righIconSize={30}
        righIconColor={'#95959C'}
      />
      <View style={[styles.mainContainer]}>
        <View
          style={{
            marginTop: hp(6),
            paddingHorizontal: 20,
          }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {tabOptions.map((item, index) => tabMenuItemView(item, index))}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: hp(6),
          }}>
          {gameCardLayout === 'carousel' ? (
            <Carousel
              layout={'default'}
              data={gamelistDATA}
              renderItem={({item}) => gameCardView(item, props.navigation)}
              sliderWidth={wp(100)}
              itemWidth={wp(80)}
              inactiveSlideScale={0.9}
            />
          ) : (
            <View style={{paddingHorizontal: 20}}>
              <FlatList
                data={gamelistDATA}
                renderItem={({item}) => gameListView(item, props.navigation)}
              />
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Arcadia;
