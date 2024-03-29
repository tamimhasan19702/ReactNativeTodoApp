/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
