import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon } from "../components/ui/Icons";

interface AppPermissionsProps {
  onBack: () => void;
}

export default function AppPermissions({ onBack }: AppPermissionsProps) {
  const { colors } = useTheme();

  const [camera, setCamera] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [storage, setStorage] = useState(true);
  const [location, setLocation] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]}
          onPress={onBack}
        >
          <ChevronLeftIcon size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>App Permissions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {[
            {
              id: "notifications",
              icon: "🔔",
              title: "Push Notifications",
              desc: "Allows FinPilot to send bill alerts and transaction updates",
              value: notifications,
              setter: setNotifications,
            },
            {
              id: "camera",
              icon: "📷",
              title: "Camera & Photos",
              desc: "Used for uploading receipt photos and custom profile avatar",
              value: camera,
              setter: setCamera,
            },
            {
              id: "biometrics",
              icon: "🔐",
              title: "Biometric Auth (Face/Touch ID)",
              desc: "Secure login using fingerprint or facial recognition",
              value: biometrics,
              setter: setBiometrics,
            },
            {
              id: "storage",
              icon: "📁",
              title: "Files & Storage",
              desc: "Required for downloading monthly PDF financial reports",
              value: storage,
              setter: setStorage,
            },
            {
              id: "location",
              icon: "📍",
              title: "Location Access",
              desc: "Used for local merchant identification and currency formatting",
              value: location,
              setter: setLocation,
            },
          ].map((item, idx, arr) => (
            <React.Fragment key={item.id}>
              <View style={styles.permissionRow}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
                  <Text style={[styles.desc, { color: colors.textMuted }]}>{item.desc}</Text>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.setter}
                  trackColor={{ false: "#64748b", true: colors.accent }}
                  thumbColor="#ffffff"
                />
              </View>
              {idx < arr.length - 1 && <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  permissionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
