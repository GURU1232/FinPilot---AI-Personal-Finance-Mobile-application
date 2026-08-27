import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon, ChevronRightIcon } from "../components/ui/Icons";

interface SettingsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function Settings({ onBack, onNavigate }: SettingsProps) {
  const { colors } = useTheme();

  const settingsItems = [
    {
      id: "account_settings",
      icon: "👤",
      label: "Account settings",
    },
    {
      id: "notification_settings",
      icon: "🔔",
      label: "Notification settings",
    },
    {
      id: "app_permissions",
      icon: "📇",
      label: "App permissions",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]} onPress={onBack}>
          <ChevronLeftIcon size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuContainer}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuCard,
                { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
              ]}
              onPress={() => onNavigate(item.id)}
            >
              <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>
                {item.label}
              </Text>
              <ChevronRightIcon size={16} color={colors.textMuted} />
            </TouchableOpacity>
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
    paddingTop: 12,
  },
  menuContainer: {
    gap: 12,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
});
