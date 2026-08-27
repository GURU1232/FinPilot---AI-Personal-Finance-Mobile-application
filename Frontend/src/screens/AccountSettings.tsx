import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, TrashIcon } from "../components/ui/Icons";

interface AccountSettingsProps {
  onBack: () => void;
  onNavigateToProfileEdit?: () => void;
}

export default function AccountSettings({ onBack, onNavigateToProfileEdit }: AccountSettingsProps) {
  const { colors } = useTheme();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your FinPilot account? This action is permanent and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => Alert.alert("Account Deleted", "Your account has been deleted."),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]} onPress={onBack}>
          <ChevronLeftIcon size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Account Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuContainer}>
          {/* Edit Profile */}
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
            onPress={onNavigateToProfileEdit || onBack}
          >
            <PencilIcon size={18} color={colors.textPrimary} />
            <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>Edit Profile</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Delete Account */}
          <TouchableOpacity
            style={[styles.menuCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
            onPress={handleDeleteAccount}
          >
            <TrashIcon size={18} color="#ef4444" />
            <Text style={[styles.menuLabel, { color: "#ef4444" }]}>Delete Account</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>
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
