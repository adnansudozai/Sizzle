import {View, Image, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Container, ResponsiveText, Header} from '../../../../components';
import styles from './styles';
import {coursePlaylistDATA} from './dummyArray';

const CourseVideosScreen = props => {
  const headerView = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <ResponsiveText style={styles.headertitle}>
          {'Bitcoin (BTC)'}
        </ResponsiveText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ResponsiveText style={styles.headerSubtitle}>
            {'10 Videos'}
          </ResponsiveText>
          <Icon name={'circle-small'} size={15} color={'#000'} />
          <ResponsiveText style={styles.headerSubtitle}>
            {'5 Watched'}
          </ResponsiveText>
        </View>
      </View>
    );
  };

  const videoPlaylistItem = ({item}) => {
    const isWatched = i => {
      if (i[0] === i[1]) return true;
    };
    const watchStatusCopy = i => {
      if (i[0] === '0') return `${i[1]} minutes`;
      if (isWatched(i)) return `watched`;
      else return `watched ${i[0]} of ${i[1]} minutes`;
    };

    return (
      <View style={styles.playlistItemContainer}>
        <Image source={item.image} style={styles.playlistVideoThumbnail} />
        <View style={{marginLeft: 15}}>
          <ResponsiveText
            style={styles.playlistVideotitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </ResponsiveText>
          <ResponsiveText
            style={[
              styles.playlistVideoAward,
              {
                color: isWatched(item.watchStatus) ? '#1EE025' : '#0F33AD',
              },
            ]}>
            {isWatched(item.watchStatus)
              ? `${item.award} Earned`
              : `Earn ${item.award}`}
          </ResponsiveText>
          <ResponsiveText style={styles.playlistVideoWatchStatus}>
            {watchStatusCopy(item.watchStatus)}
          </ResponsiveText>
        </View>
      </View>
    );
  };

  const videoCard = ({item}) => {
    return (
      <View style={styles.carouselVideoCardContainer}>
        <Image source={item.image} style={styles.carouselVideoImage} />
        <View style={styles.carouselVideoText}>
          <ResponsiveText
            style={styles.carouselVideotitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </ResponsiveText>
          <ResponsiveText style={styles.carouselVideoAward}>
            {`Earn ${item.award}`}
          </ResponsiveText>
          <ResponsiveText style={styles.carouselVideoWatchStatus}>
            {`watched ${item.watchStatus[0]} of ${item.watchStatus[1]} minutes`}
          </ResponsiveText>
        </View>
      </View>
    );
  };

  const watchedVideos = coursePlaylistDATA.filter(v => v.watchStatus[0] != '0');

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        titleView={headerView}
        textColor={'#000'}
      />
      <View style={styles.mainContainer}>
        <View style={{marginTop: hp(4)}}>
          <Carousel
            layout={'default'}
            data={watchedVideos}
            renderItem={videoCard}
            sliderWidth={wp(100)}
            itemWidth={wp(90)}
            inactiveSlideScale={1}
          />
        </View>
        <View style={styles.videoList}>
          <ResponsiveText
            style={{
              fontWeight: '500',
              color: '#1F1F1F',
              fontSize: 4.3,
              marginBottom: 20,
            }}>
            {'All Videos'}
          </ResponsiveText>
          <FlatList data={coursePlaylistDATA} renderItem={videoPlaylistItem} />
        </View>
      </View>
    </Container>
  );
};

export default CourseVideosScreen;
