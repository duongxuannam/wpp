import { normalize, normalizeHeight } from '../../Themes/Metrics';
import { Colors } from '../../Themes';

export default {
  header: {
    container: {
      height: normalizeHeight(60), flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0,
      borderBottomColor: '#E6E6E6',
    },
    wrapper: {
      marginLeft: normalize(10),
      position: 'absolute', top: 0, bottom: 0,
      justifyContent: 'center', zIndex: 10,
    },
    icon: { paddingRight: normalize(10), paddingVertical: normalize(10) },
    title: {
      paddingHorizontal: normalize(35),
      flex: 1, fontSize: normalize(19), fontWeight: '500',
      textAlign: 'center',
    },
  },
  button: {
    marginHorizontal: normalize(20), marginBottom: normalizeHeight(50),
    backgroundColor: Colors.primary, borderColor: Colors.primary,
  },
  wrapButton: { position: 'absolute', bottom: 0, left: 0, right: 0 },
};