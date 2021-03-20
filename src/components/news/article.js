/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Input, Text} from 'galio-framework';
import {Linking, View} from 'react-native';
import {COLOR} from '../shared/colors';
import {sharedStyles} from '../shared/shared.style';
import {Image} from 'react-native';
import {getNews} from '../../services/user.services';
import Loading from '../SplashScreen';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import Hr from '../shared/hr';
import {addCoinStyle} from '../add-favourite/AddCoin.style';

export default function Article() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      getNews(search)
        .then(res => {
          console.log(res.data);
          setNews(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  return (
    <View style={sharedStyles.body}>
      <Input
        style={addCoinStyle.input}
        placeholder="Search"
        placeholderTextColor={COLOR.APP_GREY}
        value={search}
        onChangeText={setSearch}
        color={COLOR.WHITE}
      />
      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          news.map((item, i) => (
            <React.Fragment key={`new_row_${i}`}>
              <ArticleRow news={item} />
              <Hr color={COLOR.APP_GREY} />
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function ArticleRow({news}) {
  const loadInBrowser = () => {
    Linking.openURL(news.url).catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  return (
    <TouchableOpacity onPress={loadInBrowser}>
      <View style={{display: 'flex', flexDirection: 'row', padding: 10}}>
        <View style={{display: 'flex', flexDirection: 'column', flex: 5}}>
          <Text color={COLOR.WHITE} bold>
            {news.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text color={COLOR.APP_GREY} bold style={{paddingRight: 5}}>
              {news.source} .
            </Text>
            <Text bold color={COLOR.APP_GREY}>
              {moment(news.published_on * 1000).fromNow()}
            </Text>
          </View>
        </View>
        <View style={{display: 'flex', flex: 1}}>
          <Image
            source={{uri: news.imageurl}}
            style={{
              width: 50,
              height: 50,
              /* borderWidth: 1,
            borderColor: COLOR.APP_GREY, */
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
