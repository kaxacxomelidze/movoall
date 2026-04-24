import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOVO_CURRENCY_SYMBOL } from '../../packages/shared/src';

type DriverScreen = 'dashboard' | 'request' | 'pickup' | 'trip' | 'earnings' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<DriverScreen>('dashboard');
  const [online, setOnline] = useState(false);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>MOVO Driver</Text>
        <TouchableOpacity onPress={() => setOnline(!online)} style={[styles.onlinePill, online && styles.onlinePillActive]}>
          <Text style={[styles.onlineText, online && styles.onlineTextActive]}>{online ? 'ONLINE' : 'OFFLINE'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {screen === 'dashboard' && <Dashboard online={online} go={setScreen} />}
        {screen === 'request' && <IncomingRequest go={setScreen} />}
        {screen === 'pickup' && <PickupFlow go={setScreen} />}
        {screen === 'trip' && <TripFlow go={setScreen} />}
        {screen === 'earnings' && <Earnings />}
        {screen === 'profile' && <Profile />}
      </ScrollView>

      <View style={styles.tabs}>
        <Tab title="Home" active={screen === 'dashboard'} onPress={() => setScreen('dashboard')} />
        <Tab title="Request" active={screen === 'request'} onPress={() => setScreen('request')} />
        <Tab title="Earnings" active={screen === 'earnings'} onPress={() => setScreen('earnings')} />
        <Tab title="Profile" active={screen === 'profile'} onPress={() => setScreen('profile')} />
      </View>
    </SafeAreaView>
  );
}

function Dashboard({ online, go }: any) {
  return (
    <>
      <MapCard />
      <View style={styles.sheet}>
        <Text style={styles.title}>{online ? 'You are online' : 'Go online to receive rides'}</Text>
        <Text style={styles.subtitle}>Rider and Driver apps will connect through Laravel API and realtime ride events.</Text>
        <Stat label="Today earnings" value={`42.50${MOVO_CURRENCY_SYMBOL}`} />
        <Stat label="Completed rides" value="8" />
        <PrimaryButton title="Simulate incoming ride" onPress={() => go('request')} />
      </View>
    </>
  );
}

function IncomingRequest({ go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.status}>New ride request</Text>
      <Text style={styles.title}>MOVO Plus</Text>
      <Text style={styles.bigPrice}>6.50{MOVO_CURRENCY_SYMBOL}</Text>
      <Info title="Pickup" value="456 Oak Ave, Brooklyn, NY" />
      <Info title="Destination" value="Holy Trinity Cathedral of Tbilisi" />
      <Info title="Distance" value="5.2 km" />
      <View style={styles.rowButtons}>
        <DangerButton title="Decline" onPress={() => go('dashboard')} />
        <PrimaryButton title="Accept" onPress={() => go('pickup')} />
      </View>
    </View>
  );
}

function PickupFlow({ go }: any) {
  return (
    <>
      <MapCard />
      <View style={styles.sheet}>
        <Text style={styles.status}>Navigate to pickup</Text>
        <Text style={styles.title}>Rider waiting</Text>
        <Info title="Verification code" value="179" />
        <Info title="Pickup" value="456 Oak Ave, Brooklyn, NY" />
        <PrimaryButton title="Arrived at pickup" onPress={() => go('trip')} />
      </View>
    </>
  );
}

function TripFlow({ go }: any) {
  return (
    <>
      <MapCard />
      <View style={styles.sheet}>
        <Text style={styles.status}>On trip</Text>
        <Text style={styles.title}>Arrive at 9:56</Text>
        <Info title="Destination" value="Holy Trinity Cathedral of Tbilisi" />
        <Info title="Guaranteed ride" value="Price and arrival time are locked" />
        <PrimaryButton title="Complete trip" onPress={() => go('earnings')} />
      </View>
    </>
  );
}

function Earnings() {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Earnings</Text>
      <Text style={styles.bigPrice}>42.50{MOVO_CURRENCY_SYMBOL}</Text>
      <Stat label="Today trips" value="8" />
      <Stat label="Rating" value="4.96" />
      <Stat label="MOVO tier" value="Diamond" />
    </View>
  );
}

function Profile() {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Driver profile</Text>
      <Info title="Driver" value="Zacharis Fredrick" />
      <Info title="Vehicle" value="Silver Toyota Camry • ABC 3244" />
      <Info title="Rating" value="5.0" />
      <Info title="Documents" value="Vehicle and license verification planned" />
    </View>
  );
}

function MapCard() {
  return <View style={styles.mapCard}><Text style={styles.mapTitle}>Driver Map Placeholder</Text><Text style={styles.mapText}>Mapbox now, Yandex Maps later.</Text></View>;
}
function Info({ title, value }: any) {
  return <View style={styles.info}><Text style={styles.infoTitle}>{title}</Text><Text style={styles.infoValue}>{value}</Text></View>;
}
function Stat({ label, value }: any) {
  return <View style={styles.stat}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>;
}
function PrimaryButton({ title, onPress }: any) {
  return <TouchableOpacity style={styles.primaryButton} onPress={onPress}><Text style={styles.primaryText}>{title}</Text></TouchableOpacity>;
}
function DangerButton({ title, onPress }: any) {
  return <TouchableOpacity style={styles.dangerButton} onPress={onPress}><Text style={styles.primaryText}>{title}</Text></TouchableOpacity>;
}
function Tab({ title, active, onPress }: any) {
  return <TouchableOpacity onPress={onPress} style={styles.tab}><Text style={[styles.tabText, active && styles.tabActive]}>{title}</Text></TouchableOpacity>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 24, fontWeight: '900', color: '#111827' },
  onlinePill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: '#E5E7EB' },
  onlinePillActive: { backgroundColor: '#16A34A' },
  onlineText: { fontWeight: '900', color: '#111827', fontSize: 12 },
  onlineTextActive: { color: '#FFFFFF' },
  content: { padding: 16, paddingBottom: 100 },
  mapCard: { height: 260, borderRadius: 28, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', padding: 24, marginBottom: 16 },
  mapTitle: { fontSize: 24, fontWeight: '900', color: '#111827' },
  mapText: { marginTop: 8, color: '#6B7280', textAlign: 'center' },
  sheet: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 18, gap: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  title: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subtitle: { fontSize: 15, color: '#6B7280', lineHeight: 22 },
  status: { color: '#16A34A', fontWeight: '900' },
  bigPrice: { fontSize: 42, fontWeight: '900', color: '#111827' },
  info: { padding: 16, borderRadius: 18, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB' },
  infoTitle: { color: '#6B7280', fontWeight: '800' },
  infoValue: { marginTop: 4, color: '#111827', fontSize: 16, fontWeight: '900' },
  stat: { padding: 16, borderRadius: 18, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: '#6B7280', fontWeight: '800' },
  statValue: { color: '#111827', fontWeight: '900' },
  rowButtons: { flexDirection: 'row', gap: 10 },
  primaryButton: { flex: 1, height: 54, borderRadius: 18, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  dangerButton: { flex: 1, height: 54, borderRadius: 18, backgroundColor: '#DC2626', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  tabs: { position: 'absolute', left: 12, right: 12, bottom: 12, height: 68, borderRadius: 26, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  tab: { padding: 8 },
  tabText: { color: '#6B7280', fontWeight: '800', fontSize: 12 },
  tabActive: { color: '#111827' }
});
