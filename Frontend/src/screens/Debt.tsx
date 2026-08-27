import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, SparkleIcon } from "../components/ui/Icons";
import { debts } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export default function Debt() {
  const { colors } = useTheme();
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("avalanche");

  const totalDebt = debts.reduce((a, d) => a + d.balance, 0);
  const totalEmi = debts.reduce((a, d) => a + d.emi, 0);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={colors.headerBg as [string, string]} style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Debt Payoff</Text>
            <Text style={styles.subtitle}>{debts.length} active loans / credit accounts</Text>
          </View>
          <Pressable style={styles.addBtn}>
            <PlusIcon size={18} color="#ffffff" />
          </Pressable>
        </View>

        {/* Total Cards */}
        <View style={styles.totalRow}>
          <View style={[styles.totalCard, { backgroundColor: "rgba(239,68,68,0.15)" }]}>
            <Text style={styles.totalLabel}>Total Outstanding</Text>
            <Text style={[styles.totalVal, { color: "#f87171" }]}>₹{totalDebt.toLocaleString("en-IN")}</Text>
          </View>
          <View style={[styles.totalCard, { backgroundColor: "rgba(245,158,11,0.15)" }]}>
            <Text style={styles.totalLabel}>Total Monthly EMI</Text>
            <Text style={[styles.totalVal, { color: "#fbbf24" }]}>₹{totalEmi.toLocaleString("en-IN")}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Strategy Selector */}
        <View style={[styles.strategyBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.strategyTitle, { color: colors.textPrimary }]}>Payoff Strategy</Text>
          <View style={styles.strategyTabs}>
            <Pressable
              onPress={() => setStrategy("avalanche")}
              style={[
                styles.strategyTab,
                { backgroundColor: strategy === "avalanche" ? colors.accent : colors.isDark ? "#2a2a36" : "#f1f5f9" },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: strategy === "avalanche" ? "#ffffff" : colors.textMuted }}>
                ⚡ Avalanche (High Rate First)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setStrategy("snowball")}
              style={[
                styles.strategyTab,
                { backgroundColor: strategy === "snowball" ? colors.accent : colors.isDark ? "#2a2a36" : "#f1f5f9" },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: strategy === "snowball" ? "#ffffff" : colors.textMuted }}>
                🏔️ Snowball (Smallest First)
              </Text>
            </Pressable>
          </View>

          <View style={[styles.aiRecommendation, { backgroundColor: colors.isDark ? "#1e1b4b" : "#f5f3ff" }]}>
            <SparkleIcon size={14} color={colors.accent} />
            <Text style={[styles.aiRecText, { color: colors.accent }]}>
              {strategy === "avalanche"
                ? "Avalanche strategy saves ₹42,000 in total interest by prioritizing your HDFC Credit Card (36%)."
                : "Snowball strategy gives quick psychological wins by clearing your Personal Loan first."}
            </Text>
          </View>
        </View>

        {/* Debt Item Cards */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Your Liabilities</Text>
        {debts.map((d) => {
          const paidPct = Math.round(((d.original - d.balance) / d.original) * 100);
          const isHighInterest = d.rate > 15;
          return (
            <View key={d.id} style={[styles.debtCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.debtHeader}>
                <View style={[styles.debtIconBg, { backgroundColor: `${d.color}18` }]}>
                  <Text style={{ fontSize: 20 }}>{d.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.debtName, { color: colors.textPrimary }]}>{d.name}</Text>
                    {isHighInterest && (
                      <View style={styles.highBadge}>
                        <Text style={styles.highBadgeText}>High Interest</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.lenderText, { color: colors.textMuted }]}>{d.lender} • {d.rate}% p.a.</Text>
                </View>
              </View>

              <View style={styles.valGrid}>
                <View style={[styles.valBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.valLabel, { color: colors.textMuted }]}>Balance</Text>
                  <Text style={[styles.valNumber, { color: colors.textPrimary }]}>₹{d.balance.toLocaleString("en-IN")}</Text>
                </View>
                <View style={[styles.valBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.valLabel, { color: colors.textMuted }]}>Monthly EMI</Text>
                  <Text style={[styles.valNumber, { color: colors.accent }]}>₹{d.emi.toLocaleString("en-IN")}</Text>
                </View>
                <View style={[styles.valBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.valLabel, { color: colors.textMuted }]}>Est. Payoff</Text>
                  <Text style={[styles.valNumber, { color: colors.textPrimary }]}>{d.tenureLeft} mos</Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressRow}>
                  <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>{paidPct}% Paid Off</Text>
                  <Text style={[styles.originalLabel, { color: colors.textMuted }]}>Original ₹{d.original.toLocaleString("en-IN")}</Text>
                </View>
                <View style={[styles.track, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                  <View style={[styles.fill, { width: `${paidPct}%`, backgroundColor: d.color }]} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  subtitle: { fontSize: 11, color: "rgba(255,255,255,0.55)" },
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  totalRow: { flexDirection: "row", gap: 12 },
  totalCard: { flex: 1, padding: 14, borderRadius: 16 },
  totalLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)" },
  totalVal: { fontSize: 18, fontWeight: "bold", marginTop: 4 },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  strategyBox: { borderRadius: 20, padding: 16, borderWidth: 1, elevation: 1 },
  strategyTitle: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  strategyTabs: { gap: 8, marginBottom: 12 },
  strategyTab: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, alignItems: "center" },
  aiRecommendation: { flexDirection: "row", gap: 8, padding: 12, borderRadius: 12, alignItems: "center" },
  aiRecText: { flex: 1, fontSize: 11, lineHeight: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "600", marginVertical: 4 },
  debtCard: { borderRadius: 20, padding: 16, borderWidth: 1, elevation: 1, marginBottom: 4 },
  debtHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  debtIconBg: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  debtName: { fontSize: 14, fontWeight: "bold" },
  highBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: "#fee2e2" },
  highBadgeText: { fontSize: 9, fontWeight: "bold", color: "#dc2626" },
  lenderText: { fontSize: 11, marginTop: 2 },
  valGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  valBox: { flex: 1, padding: 10, borderRadius: 12 },
  valLabel: { fontSize: 10 },
  valNumber: { fontSize: 13, fontWeight: "bold", marginTop: 2 },
  progressSection: { gap: 6 },
  progressRow: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { fontSize: 11, fontWeight: "600" },
  originalLabel: { fontSize: 11 },
  track: { height: 6, borderRadius: 3 },
  fill: { height: "100%", borderRadius: 3 },
});
