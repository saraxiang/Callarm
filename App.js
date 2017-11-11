import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, DatePickerIOS } from 'react-native';

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
    this.props.handleDateChange(this.state.date.toLocaleDateString() + ' ' + this.state.date.toLocaleTimeString());
    this.setState({
      date: date,
    });
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
    // Ideally, the timezone input would be a picker rather than a
    // text input, but we don't have any pickers yet :(
    return (
      <View>
        <WithLabel label="Value:">
          <Text>{
            this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
        <WithLabel label="Timezone:">
          <TextInput
            onChange={this.onTimezoneChange}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>
        <DatePickerIOS
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

export default class App extends React.Component {

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
        <Text>Callarm</Text>
        <DatePickerExample 
          handleDateChange={this.setDate}
        />
        <Button
          onPress={this.addAlarm}
          title="Set Alarm"
          color="#841584"
          accessibilityLabel="Set Alarm"
        />
        <Text>Alarms Set</Text>
        <Text>{this.state.alarms.toString()}</Text>
      </View>
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
