import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);
  const [lowPowerMode, setLowPowerMode] = useState<boolean | null>(null);

  useEffect(() => {
    async function getBatteryStatus() {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100);

      const isCharging = await Battery.getBatteryStateAsync();
      setCharging(isCharging === Battery.BatteryState.CHARGING || isCharging === Battery.BatteryState.FULL);

      const isLowPower = await Battery.isLowPowerModeEnabledAsync();
      setLowPowerMode(isLowPower);
    }

    getBatteryStatus();

    const batteryLevelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel * 100);
    });

    const batteryStateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
      setCharging(batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL);
    });

    const lowPowerSubscription = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
      setLowPowerMode(lowPowerMode);
    });

    return () => {
      batteryLevelSubscription.remove();
      batteryStateSubscription.remove();
      lowPowerSubscription.remove();
    };
  }, []);

  const batteryColor =
    batteryLevel !== null
      ? batteryLevel > 50
        ? '#4CAF50'
        : batteryLevel > 20
        ? '#FFC107' 
        : '#F44336' 
      : '#B0BEC5'; 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons
          name={charging ? 'battery-charging' : 'battery'}
          size={80}
          color={batteryColor}
        />
        <Text style={[styles.batteryText, { color: batteryColor }]}>
          {batteryLevel !== null ? `${batteryLevel.toFixed(0)}%` : 'Загрузка...'}
        </Text>
        <Text style={styles.statusText}>
          {charging ? '⚡ Телефон заряжается' : '🔌 Не заряжается'}
        </Text>
        <Text style={styles.statusText}>
          {lowPowerMode ? '⚠️ Энергосбережение ВКЛ' : '✅ Энергосбережение ВЫКЛ'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  batteryText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusText: {
    fontSize: 18,
    marginTop: 10,
    color: '#37474F',
  },
});
