import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalize, ratioScreen, normalizeHeight } from '../../util/common';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = normalizeHeight(200);
const slideHeight = normalizeHeight(200) * ratioScreen;
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: '#1a1917',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: '#D0CDCE',
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: '#1a1917',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: '#1a1917',
  },
  textContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#D0CDCE',
    // borderBottomLeftRadius: entryBorderRadius,
    // borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: '#1a1917',
  },
  title: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 4,
    color: 'white',
    fontSize: normalize(13),
    fontStyle: 'italic',
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});