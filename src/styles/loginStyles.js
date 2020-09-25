import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'center',
    flexDirection: 'column-reverse'
  },
  SigninOrRegisterButton: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
    alignSelf: 'center',
    flexDirection: 'column-reverse'
  },
  SigninOrRegisterBorderless:{
    borderWidth: 0,
    marginBottom: 20
  },
  borderless:{
    borderWidth: 0
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  forgotPassword: {
    marginRight: 30,
    alignSelf: 'flex-end',
  },
  goBack: {
    alignSelf: 'center',
    marginTop: 30,
  },
  body: {
    flex:1,
    backgroundColor: '#121212'
  },
  centerForm:{
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  description:{
    marginTop: 20,
    paddingHorizontal: 30,
  },
  extraText:{
    paddingTop: 10,
    alignSelf: 'center',
  },
  row:{
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 20,
  },
  input:{
    borderColor: "#808080",
    backgroundColor: '#121212',
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  linearGradient:{
    borderRadius: 25
  }

  //not used
  /*
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionTitle: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: '600',
    color: 'gray',
    paddingBottom: 40,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft:20,
    fontSize: 17,
  },
  */
});
