import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const Calender = props => {
  const [year, setyear] = useState(new Date().getFullYear());
  const [month, setmonth] = useState(new Date().getMonth());
  const [monthDays, setmonthDays] = useState([]);
  const weeklist = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  NewDate = new Date()
  // [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ]
  const monthStr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  //   const date = new Date();
  //   setmonth(date.getMonth());
  //   setyear(date.getFullYear());

  useEffect(() => {
    getmonth();
  }, [month]);
  const getmonth = () => {
    try {
      totalDays = new Date(year, month + 1, 0);
      data = [];
      for (i = 1; i <= totalDays.getDate(); i++) {
        var newDate = new Date(year, month, i);
        data.push({
          date: newDate.getDate(),
          all: newDate,
          weakDay: newDate.getDay(),
        });
      }
      // console.log('...........................ass', data);
      space = [];
      for (var i = 0; i < data[0].weakDay; i++) {
        space.push({
          date: '',
          all: new Date('1000-01-01'),
          weakDay: i,
        });
      }
      setmonthDays([...space, ...data]);
    } catch (err) {
      console.log('err............', err);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
      <View>
        <View
          style={{
            padding: 10,
            margin: 10,
            borderWidth: 1,
            borderRadius: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => {
                if (month == 0) {
                  setmonth(11);
                  setyear(year - 1);
                } else {
                  setmonth(month - 1);
                }
              }}>
              <Text>Prev</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text>{year}</Text>
              <Text>{monthStr[month]}</Text>
            </View>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => {
                if (month >= 11) {
                  setmonth(0);
                  setyear(year + 1);
                } else {
                  setmonth(month + 1);
                }
              }}>
              <Text>Nex</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {weeklist.map(val => {
              return (
                <View
                  key={val}
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{val}</Text>
                </View>
              );
            })}
          </View>
          <FlatList
            data={monthDays}
            key={'monthDays'}
            numColumns={7}
            style={{ alignSelf: 'center' }}
            // columnWrapperStyle={{flexWrap: 'wrap'}}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 40,
                    width: 40,
                    borderWidth: item?.all == NewDate ? 1 : 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{item?.date}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', }}>
          {monthStr.map((months, ind) => {
            return (
              <View key={ind} style={[{ paddingVertical: 5, paddingHorizontal: 20, borderWidth: 1, margin: 5, borderRadius: 10 }]}>
                <Text>{months}</Text>
              </View>)
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Calender;

const styles = StyleSheet.create({});
