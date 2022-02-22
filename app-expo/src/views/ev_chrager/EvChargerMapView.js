import * as React from 'react';
import { Text, View } from 'react-native';

function EvChargerMap() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>충전소 지도가 올 자리</Text>
    </View>
  );
}

export default function EvChargerMapView() {
  return (
    <EvChargerMap />
  );
}
