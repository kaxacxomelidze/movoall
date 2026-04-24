import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOVO_CURRENCY_SYMBOL, translations, type AppLanguage } from '../../packages/shared/src';

type ScreenKey = 'home' | 'route' | 'rides' | 'cargo' | 'air' | 'active' | 'receipt' | 'profile';

const rideOptions = [
  { name: 'MOVO Plus', eta: '12 min', price: 6.5 },
  { name: 'MOVO Prime', eta: '12 min', price: 8.2 },
  { name: 'MOVO Max', eta: '12 min', price: 10.5 },
  { name: 'MOVO Eco', eta: '12 min', price: 5.9 },
  { name: 'MOVO Safe', eta: '12 min', price: 7.4 },
  { name: 'MOVO Cargo', eta: '12 min', price: 9.5 },
  { name: 'MOVO Air', eta: '45 min', price: 256 }
];

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>('home');
  const [language, setLanguage] = useState<AppLanguage>('ka');
  const t = useMemo(() => translations[language], [language]);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>MOVO</Text>
        <View style={styles.langRow}>
          {(['ka', 'en', 'ru'] as AppLanguage[]).map((item) => (
            <TouchableOpacity key={item} onPress={() => setLanguage(item)} style={[styles.lang, language === item && styles.langActive]}>
              <Text style={[styles.langText, language === item && styles.langTextActive]}>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {screen === 'home' && <HomeScreen t={t} go={setScreen} />}
        {screen === 'route' && <RouteScreen t={t} go={setScreen} />}
        {screen === 'rides' && <RideSelectionScreen t={t} go={setScreen} />}
        {screen === 'cargo' && <CargoScreen t={t} go={setScreen} />}
        {screen === 'air' && <AirScreen t={t} go={setScreen} />}
        {screen === 'active' && <ActiveRideScreen go={setScreen} />}
        {screen === 'receipt' && <ReceiptScreen go={setScreen} />}
        {screen === 'profile' && <ProfileScreen />}
      </ScrollView>

      <View style={styles.tabs}>
        <Tab title="Home" active={screen === 'home'} onPress={() => setScreen('home')} />
        <Tab title="History" active={screen === 'receipt'} onPress={() => setScreen('receipt')} />
        <Tab title="Cargo" active={screen === 'cargo'} onPress={() => setScreen('cargo')} />
        <Tab title="Profile" active={screen === 'profile'} onPress={() => setScreen('profile')} />
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ t, go }: any) {
  return (
    <>
      <MapCard />
      <View style={styles.sheet}>
        <Text style={styles.title}>{t.appName}</Text>
        <Text style={styles.subtitle}>Taxi, Cargo and MOVO Air in one Android app.</Text>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>{t.pickup}</Text>
          <Text style={styles.locationValue}>456 Oak Ave, Brooklyn, NY</Text>
        </View>
        <View style={styles.locationBox}>
          <Text style={styles.locationLabel}>{t.destination}</Text>
          <Text style={styles.locationValue}>Holy Trinity Cathedral of Tbilisi</Text>
        </View>
        <PrimaryButton title="Plan route" onPress={() => go('route')} />
      </View>
    </>
  );
}

function RouteScreen({ t, go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Plan your route</Text>
      <InputLike label={t.pickup} value="Your current location" />
      <InputLike label={t.destination} value="Where to?" />
      <Text style={styles.sectionTitle}>Saved places</Text>
      {['Home', 'Work', 'Work HQ'].map((place) => <ListRow key={place} title={place} subtitle="Tbilisi, Georgia" />)}
      <PrimaryButton title="Choose ride" onPress={() => go('rides')} />
    </View>
  );
}

function RideSelectionScreen({ t, go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>{t.confirmRide}</Text>
      <View style={styles.guaranteeCard}>
        <Text style={styles.guaranteeTitle}>Price locked</Text>
        <Text style={styles.guaranteeText}>No extra charges after booking. If your driver cancels, you get instant credit.</Text>
      </View>
      <View style={styles.grid}>
        {rideOptions.map((ride) => (
          <TouchableOpacity key={ride.name} style={styles.rideCard} onPress={() => ride.name === 'MOVO Cargo' ? go('cargo') : ride.name === 'MOVO Air' ? go('air') : go('active')}>
            <Text style={styles.ridePrice}>{ride.price}{MOVO_CURRENCY_SYMBOL}</Text>
            <Text style={styles.rideEta}>{ride.eta}</Text>
            <Text style={styles.rideName}>{ride.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function CargoScreen({ t, go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>{t.cargo}</Text>
      <InputLike label="Pickup point" value="Street, building" />
      <InputLike label="Sender phone" value="🇬🇪 +995" />
      <InputLike label="Delivery address" value="Street, building" />
      <InputLike label="Recipient phone" value="🇬🇪 +995" />
      <InputLike label="Parcel details" value="Weight, notes, protection code" />
      <View style={styles.guaranteeCard}>
        <Text style={styles.guaranteeTitle}>Delivery protection</Text>
        <Text style={styles.guaranteeText}>We send a 4-digit code to the recipient. The courier completes delivery only after code verification.</Text>
      </View>
      <PrimaryButton title="Request MOVO Cargo" onPress={() => go('active')} />
    </View>
  );
}

function AirScreen({ t, go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>{t.movoAir}</Text>
      <InputLike label="Departure city" value="Tbilisi Shota Rustaveli International Airport" />
      <InputLike label="Destination city" value="Kutaisi Davit Agmashenebeli International Airport" />
      <View style={styles.guaranteeCard}>
        <Text style={styles.guaranteeTitle}>Private aircraft for selected city routes</Text>
        <Text style={styles.guaranteeText}>Licensed pilot, fixed route, priority boarding and locked final price before booking.</Text>
      </View>
      <PrimaryButton title="Request MOVO Air" onPress={() => go('active')} />
    </View>
  );
}

function ActiveRideScreen({ go }: any) {
  return (
    <>
      <MapCard />
      <View style={styles.sheet}>
        <Text style={styles.status}>Driver is arriving in 8 MIN</Text>
        <Text style={styles.title}>Zacharis Fredrick</Text>
        <Text style={styles.subtitle}>5.0 rating • ABC 3244 • Silver Toyota Camry</Text>
        <View style={styles.rowButtons}>
          <SecondaryButton title="Call Driver" />
          <DangerButton title="SOS" />
        </View>
        <PrimaryButton title="Complete demo ride" onPress={() => go('receipt')} />
      </View>
    </>
  );
}

function ReceiptScreen({ go }: any) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Trip receipt</Text>
      <Text style={styles.bigPrice}>13.88{MOVO_CURRENCY_SYMBOL}</Text>
      <ListRow title="Base fare" subtitle={`5.00${MOVO_CURRENCY_SYMBOL}`} />
      <ListRow title="Distance" subtitle={`10.40${MOVO_CURRENCY_SYMBOL}`} />
      <ListRow title="Promo discount" subtitle={`-1.45${MOVO_CURRENCY_SYMBOL}`} />
      <ListRow title="Paid with" subtitle="Card •••• 4242" />
      <PrimaryButton title="Back to map" onPress={() => go('home')} />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>Profile</Text>
      <ListRow title="Account" subtitle="Rider profile" />
      <ListRow title="Safety Center" subtitle="SOS, share trip, support" />
      <ListRow title="Languages" subtitle="ქართული / English / Русский" />
      <ListRow title="Auth" subtitle="Google, Apple, Email, Phone OTP ready" />
    </View>
  );
}

function MapCard() {
  return (
    <View style={styles.mapCard}>
      <Text style={styles.mapTitle}>Mapbox Map Placeholder</Text>
      <Text style={styles.mapText}>Yandex Maps will replace this when API access is ready.</Text>
    </View>
  );
}

function InputLike({ label, value }: any) {
  return (
    <View style={styles.inputLike}>
      <Text style={styles.locationLabel}>{label}</Text>
      <Text style={styles.locationValue}>{value}</Text>
    </View>
  );
}

function ListRow({ title, subtitle }: any) {
  return (
    <View style={styles.listRow}>
      <Text style={styles.listTitle}>{title}</Text>
      <Text style={styles.listSubtitle}>{subtitle}</Text>
    </View>
  );
}

function PrimaryButton({ title, onPress }: any) {
  return <TouchableOpacity style={styles.primaryButton} onPress={onPress}><Text style={styles.primaryText}>{title}</Text></TouchableOpacity>;
}
function SecondaryButton({ title }: any) {
  return <TouchableOpacity style={styles.secondaryButton}><Text style={styles.secondaryText}>{title}</Text></TouchableOpacity>;
}
function DangerButton({ title }: any) {
  return <TouchableOpacity style={styles.dangerButton}><Text style={styles.primaryText}>{title}</Text></TouchableOpacity>;
}
function Tab({ title, active, onPress }: any) {
  return <TouchableOpacity onPress={onPress} style={styles.tab}><Text style={[styles.tabText, active && styles.tabActive]}>{title}</Text></TouchableOpacity>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: '900', color: '#111827' },
  langRow: { flexDirection: 'row', gap: 6 },
  lang: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12, backgroundColor: '#E5E7EB' },
  langActive: { backgroundColor: '#111827' },
  langText: { fontSize: 11, fontWeight: '800', color: '#111827' },
  langTextActive: { color: '#FFFFFF' },
  content: { padding: 16, paddingBottom: 100 },
  mapCard: { height: 260, borderRadius: 28, backgroundColor: '#DDEBFF', justifyContent: 'center', alignItems: 'center', padding: 24, marginBottom: 16 },
  mapTitle: { fontSize: 24, fontWeight: '900', color: '#111827' },
  mapText: { marginTop: 8, color: '#6B7280', textAlign: 'center' },
  sheet: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 18, gap: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  title: { fontSize: 28, fontWeight: '900', color: '#111827' },
  subtitle: { fontSize: 15, color: '#6B7280', lineHeight: 22 },
  sectionTitle: { fontSize: 17, fontWeight: '900', marginTop: 8, color: '#111827' },
  locationBox: { padding: 16, borderRadius: 18, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB' },
  inputLike: { padding: 16, borderRadius: 18, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB' },
  locationLabel: { color: '#6B7280', fontSize: 13, fontWeight: '700' },
  locationValue: { color: '#111827', fontSize: 16, fontWeight: '800', marginTop: 4 },
  primaryButton: { height: 54, borderRadius: 18, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  secondaryButton: { flex: 1, height: 50, borderRadius: 16, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: '#FFFFFF', fontWeight: '900' },
  dangerButton: { flex: 1, height: 50, borderRadius: 16, backgroundColor: '#DC2626', alignItems: 'center', justifyContent: 'center' },
  guaranteeCard: { padding: 16, borderRadius: 18, backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#BFDBFE' },
  guaranteeTitle: { color: '#111827', fontWeight: '900', fontSize: 16 },
  guaranteeText: { marginTop: 5, color: '#374151', lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  rideCard: { width: '48%', padding: 14, borderRadius: 20, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB' },
  ridePrice: { fontSize: 18, fontWeight: '900', color: '#111827' },
  rideEta: { marginTop: 4, color: '#6B7280', fontWeight: '700' },
  rideName: { marginTop: 10, color: '#111827', fontWeight: '900' },
  status: { color: '#16A34A', fontWeight: '900' },
  rowButtons: { flexDirection: 'row', gap: 10 },
  bigPrice: { fontSize: 42, fontWeight: '900', color: '#111827' },
  listRow: { padding: 16, borderRadius: 18, backgroundColor: '#F7F8FA', borderWidth: 1, borderColor: '#E5E7EB' },
  listTitle: { fontSize: 16, fontWeight: '900', color: '#111827' },
  listSubtitle: { marginTop: 4, color: '#6B7280' },
  tabs: { position: 'absolute', left: 12, right: 12, bottom: 12, height: 68, borderRadius: 26, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  tab: { padding: 8 },
  tabText: { color: '#6B7280', fontWeight: '800', fontSize: 12 },
  tabActive: { color: '#111827' }
});
