import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');
//

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#acecf7',
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  innerWrapper: {
    backgroundColor: 'transparent',
    height: height * 0.5,
    width: width * 0.8,
    padding: 20,
    alignItems: 'flex-start',
  },
  innerWrapperBackground: {
    height: height * 0.5,
    width: width * 0.8,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ perspective: width * 0.28 * 4 }],
  },
  flatList: {
    position: 'absolute',
    top: -45,
    left: -30,
    height: height * 0.28,
    width: width,
    elevation: 5,
  },
  imageWrapper: {
    height: height * 0.28,
    width,
    paddingLeft: 50,
  },
  image: {
    resizeMode: 'cover',
    height: height * 0.28,
    width: width * 0.65,
  },
  textTitle: {
    fontFamily: 'JosefinSansBold',
    fontSize: 18,
    marginTop: height * 0.3 - 60,
  },
  textDescription: {
    fontFamily: 'JosefinSansRegular',
    fontSize: 14,
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'flex-end',
  },
  textPrice: {
    fontFamily: 'JosefinSansBold',
    fontSize: 30,
    marginRight: 15,
  },
  textCurrency: {
    fontFamily: 'JosefinSansBold',
    fontSize: 16,
    transform: [{ translateY: -3 }],
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  touchableNext: {
    marginRight: 22,
  },
  textButton: {
    fontFamily: 'JosefinSansBold',
    marginLeft: 5,
    fontSize: 16,
  },
  icon: {
    transform: [{ scaleX: 1.3 }],
  },
  card: {
    position: 'absolute',
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 5,
    transform: [{ perspective: width * 0.28 * 4 }],
  },
});
