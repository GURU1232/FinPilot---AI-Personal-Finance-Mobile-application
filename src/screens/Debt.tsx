import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, SparkleIcon } from "../components/ui/Icons";
import { debts } from "../data/mockData";

export default function Debt() {
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("avalanche");

  const totalDebt = debts.reduce((a, d) => a + d.balance, 0);
  const totalEmi = debts.reduce((a, d) => a + d.emi, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
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
        <View style={styles.strategyBox}>
          <Text style={styles.strategyTitle}>Payoff Strategy</Text>
          <View style={styles.strategyTabs}>
            <Pressable
              onPress={() => setStrategy("avalanche")}
              style={[
                styles.strategyTab,
                { backgroundColor: strategy === "avalanche" ? "#0f172a" : "#f1f5f9" },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: strategy === "avalanche" ? "#ffffff" : "#64748b" }}>
                ⚡ Avalanche (High Rate First)
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setStrategy("snowball")}
              style={[
                styles.strategyTab,
                { backgroundColor: strategy === "snowball" ? "#0f172a" : "#f1f5f9" },
              ]}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: strategy === "snowball" ? "#ffffff" : "#64748b" }}>
                🏔️ Snowball (Smallest First)
              </Text>
            </Pressable>
          </View>

          <View style={styles.aiRecommendation}>
            <SparkleIcon size={14} color="#7c3aed" />
            <Text style={styles.aiRecText}>
              {strategy === "avalanche"
                ? "Avalanche strategy saves ₹42,000 in total interest by prioritizing your HDFC Credit Card (36%)."
                : "Snowball strategy gives quick psychological wins by clearing your Personal Loan first."}
            </Text>
          </View>
        </View>

        {/* Debt Item Cards */}
        <Text style={styles.sectionTitle}>Your Liabilities</Text>
        {debts.map((d) => {
          const paidPct = Math.round(((d.original - d.balance) / d.original) * 100);
          const isHighInterest = d.rate > 15;
          return (
            <View key={d.id} style={styles.debtCard}>
              <View style={styles.debtHeader}>
                <View style={[styles.debtIconBg, { backgroundColor: `${d.color}15` }]}>
                  <Text style={{ fontSize: 20 }}>{d.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.debtName}>{d.name}</Text>
                    {isHighInterest && (
                      <View style={styles.highBadge}>
                        <Text style={styles.highBadgeText}>High Interest</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.lenderText}>{d.lender} • {d.rate}% p.a.</Text>
                </View>
              </View>

              <View style={styles.valGrid}>
                <View style={styles.valBox}>
                  <Text style={styles.valLabel}>Balance</Text>
                  <Text style={styles.valNumber}>₹{d.balance.toLocaleString("en-IN")}</Text>
                </View>
                <View style={styles.valBox}>
                  <Text style={styles.valLabel}>Monthly EMI</Text>
                  <Text style={[styles.valNumber, { color: "#6366f1" }]}>₹{d.emi.toLocaleString("en-IN")}</Text>
                </View>
                <View style={styles.valBox}>
                  <Text style={styles.valLabel}>Est. Payoff</Text>
                  <Text style={styles.valNumber}>{d.tenureLeft} mos</Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>{paidPct}% Paid Off</Text>
                  <Text style={styles.originalLabel}>Original ₹{d.original.toLocaleString("en-IN")}</Text>
                </View>
                <View style={styles.track}>
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
  container: { flex: 1, backgroundColor: "#f8fafc" },
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
  strategyBox: { backgroundColor: "#ffffff", borderRadius: 20, padding: 16, elevation: 1 },
  strategyTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 12 },
  strategyTabs: { gap: 8, marginBottom: 12 },
  strategyTab: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, alignItems: "center" },
  aiRecommendation: { flexDirection: "row", gap: 8, padding: 12, borderRadius: 12, backgroundColor: "#f5f3ff", alignItems: "center" },
  aiRecText: { flex: 1, fontSize: 11, lineHeight: 16, color: "#7c3aed" },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#64748b", marginVertical: 4 },
  debtCard: { backgroundColor: "#ffffff", borderRadius: 20, padding: 16, elevation: 1, marginBottom: 4 },
  debtHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  debtIconBg: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  nameRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  debtName: { fontSize: 14, fontWeight: "bold", color: "#0f172a" },
  highBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: "#fee2e2" },
  highBadgeText: { fontSize: 9, fontWeight: "bold", color: "#dc2626" },
  lenderText: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  valGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  valBox: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: "#f8fafc" },
  valLabel: { fontSize: 10, color: "#94a3b8" },
  valNumber: { fontSize: 13, fontWeight: "bold", color: "#0f172a", marginTop: 2 },
  progressSection: { gap: 6 },
  progressRow: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { fontSize: 11, fontWeight: "600", color: "#334155" },
  originalLabel: { fontSize: 11, color: "#94a3b8" },
  track: { height: 6, borderRadius: 3, backgroundColor: "#f1f5f9" },
  fill: { height: "100%", borderRadius: 3 },
});
