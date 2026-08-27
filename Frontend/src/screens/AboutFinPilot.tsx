import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon, ChevronRightIcon, SparkleIcon } from "../components/ui/Icons";

interface AboutFinPilotProps {
  onBack: () => void;
}

export default function AboutFinPilot({ onBack }: AboutFinPilotProps) {
  const { colors } = useTheme();

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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>About FinPilot</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* App Logo & Info */}
        <View style={styles.logoSection}>
          <View style={[styles.logoBg, { backgroundColor: colors.accent }]}>
            <SparkleIcon size={32} color="#ffffff" />
          </View>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>FinPilot AI</Text>
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>Version 1.0.0 (Build 2026.08)</Text>
          <Text style={[styles.appDesc, { color: colors.textSecondary }]}>
            FinPilot is an intelligent personal finance copilot designed to help you track expenses, plan budgets, manage liabilities, and optimize your wealth with AI insights.
          </Text>
        </View>

        {/* Links Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL("https://finpilot.ai/terms")}>
            <Text style={{ fontSize: 18 }}>📄</Text>
            <Text style={[styles.linkLabel, { color: colors.textPrimary }]}>Terms of Service</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL("https://finpilot.ai/privacy")}>
            <Text style={{ fontSize: 18 }}>🔒</Text>
            <Text style={[styles.linkLabel, { color: colors.textPrimary }]}>Privacy Policy</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL("https://finpilot.ai/licenses")}>
            <Text style={{ fontSize: 18 }}>⚖️</Text>
            <Text style={[styles.linkLabel, { color: colors.textPrimary }]}>Open Source Licenses</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Made with ❤️ for financial freedom
        </Text>
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
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    marginBottom: 12,
  },
  appDesc: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  linkLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
  },
});
