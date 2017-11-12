import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, DatePickerIOS, TabBarIOS } from 'react-native';

class DatePickerExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), 
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      date: date,
    });
    this.props.handleDateChange(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
  }

  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({
      timeZoneOffsetInHours: offset,
    })
  }

  render() {
    return (
      <View>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
      </View>
    );
  }
}

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

class AlarmPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alarms: [],
      selectedDate: new Date(),
    };
    this.addAlarm = this.addAlarm.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(dateTime) {
    this.setState({
      selectedDate: dateTime
    });
  }

  addAlarm() {
    this.state.alarms.push(this.state.selectedDate);
    this.setState({
      alarms: this.state.alarms
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Callarm</Text>
        <DatePickerExample 
          handleDateChange={this.setDate}
        />
        <Button
          onPress={this.addAlarm}
          title="Add Alarm"
          color="#841584"
          accessibilityLabel="Set Alarm"
        />
        <Text style={styles.alarmsHeader}>Alarms Set</Text>
        <Text style={styles.alarmList}>{this.state.alarms.toString()}</Text>
      </View>
    );
  }
}

class CallPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Callarm</Text>
      </View>
    );
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'setAlarm',
    };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'setAlarm'}
          systemIcon="favorites"
          onPress={() => {
              this.setState({
                  selectedTab: 'setAlarm',
              });
          }}>
          <AlarmPage/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'call'}
          systemIcon="contacts"
          onPress={() => {
                this.setState({
                    selectedTab: 'call',
                });
          }}>
          <CallPage/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    fontSize: 36,
  },
  datePicker: {
    width: 350,
  },
  alarmsHeader: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
  },
  alarmList: {
    fontSize: 24,
    width: 260,
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});
