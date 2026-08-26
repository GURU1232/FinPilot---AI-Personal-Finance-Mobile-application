import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRightIcon, SettingsIcon } from "../components/ui/Icons";
import { user } from "../data/mockData";

export default function Profile() {
  const sections = [
    {
      title: "Account & Security",
      items: [
        { label: "Personal Information", emoji: "👤", desc: "Name, email, phone" },
        { label: "Linked Bank Accounts", emoji: "🏦", desc: "HDFC Bank (••4821)" },
        { label: "Security & Passcode", emoji: "🔒", desc: "Biometrics enabled" },
      ],
    },
    {
      title: "App Preferences",
      items: [
        { label: "Notifications & Alerts", emoji: "🔔", desc: "Push, email, SMS" },
        { label: "Currency & Region", emoji: "🌐", desc: "INR (₹) • India" },
        { label: "Data Export & Backup", emoji: "📦", desc: "CSV, PDF statements" },
      ],
    },
    {
      title: "Support & Legal",
      items: [
        { label: "FinPilot Assistant Help", emoji: "🤖", desc: "FAQs & guides" },
        { label: "Privacy Policy & Terms", emoji: "📜", desc: "v2.4.0" },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Profile</Text>
          <Pressable style={styles.iconBtn}>
            <SettingsIcon size={20} color="#ffffff" />
          </Pressable>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.proBadge}>
                <Text style={styles.proText}>⚡ FinPilot Pro</Text>
              </View>
              <Text style={styles.memberText}>Member since Jan 2024</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Health Score</Text>
            <Text style={[styles.statVal, { color: "#34d399" }]}>{user.healthScore}/100</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Active Goals</Text>
            <Text style={[styles.statVal, { color: "#60a5fa" }]}>4 Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Monthly Income</Text>
            <Text style={[styles.statVal, { color: "#ffffff" }]}>₹50,000</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {sections.map((sec) => (
          <View key={sec.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{sec.title}</Text>
            <View style={styles.menuCard}>
              {sec.items.map((item, i) => (
                <Pressable key={item.label} style={[styles.menuItem, i > 0 && styles.borderTop]}>
                  <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={styles.menuDesc}>{item.desc}</Text>
                  </View>
                  <ChevronRightIcon size={16} color="#94a3b8" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Disclaimer Card */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>FinPilot Security Assurance</Text>
          <Text style={styles.disclaimerDesc}>
            Your financial data is encrypted using 256-bit AES encryption. FinPilot never stores bank credentials or shares your private data with third parties.
          </Text>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  iconBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  userCard: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 },
  avatarLarge: { width: 56, height: 56, borderRadius: 20, backgroundColor: "#6366f1", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  userName: { fontSize: 18, fontWeight: "bold", color: "#ffffff" },
  userEmail: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  proBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, backgroundColor: "rgba(99,102,241,0.3)" },
  proText: { fontSize: 10, fontWeight: "bold", color: "#a78bfa" },
  memberText: { fontSize: 10, color: "rgba(255,255,255,0.4)" },
  statsRow: { flexDirection: "row", gap: 8 },
  statBox: { flex: 1, padding: 12, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.08)" },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.55)" },
  statVal: { fontSize: 13, fontWeight: "bold", marginTop: 4 },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 16 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#64748b" },
  menuCard: { backgroundColor: "#ffffff", borderRadius: 20, paddingHorizontal: 16, elevation: 1 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  borderTop: { borderTopWidth: 1, borderTopColor: "#f1f5f9" },
  menuLabel: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  menuDesc: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  disclaimerCard: { backgroundColor: "#f8fafc", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#e2e8f0" },
  disclaimerTitle: { fontSize: 12, fontWeight: "600", color: "#64748b", marginBottom: 4 },
  disclaimerDesc: { fontSize: 11, lineHeight: 16, color: "#94a3b8" },
  logoutBtn: { paddingVertical: 14, borderRadius: 16, backgroundColor: "#fee2e2", alignItems: "center" },
  logoutText: { fontSize: 14, fontWeight: "bold", color: "#dc2626" },
});
