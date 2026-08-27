import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PlusIcon, SparkleIcon } from "../components/ui/Icons";
import { budgets } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export default function Budget() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<number | null>(null);
  const totalBudget = budgets.reduce((a, b) => a + b.limit, 0);
  const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);
  const totalPct = Math.round((totalSpent / totalBudget) * 100);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={colors.headerBg as [string, string]} style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Budget</Text>
          <Pressable style={styles.addBtn}>
            <PlusIcon size={18} color="#ffffff" />
          </Pressable>
        </View>

        {/* Overall Progress */}
        <View style={styles.overallCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.cardLabel}>Total Spent</Text>
              <Text style={styles.cardVal}>₹{totalSpent.toLocaleString("en-IN")}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.cardLabel}>Total Budget</Text>
              <Text style={styles.cardVal}>₹{totalBudget.toLocaleString("en-IN")}</Text>
            </View>
          </View>
          <View style={[styles.track, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
            <View
              style={[
                styles.fill,
                {
                  width: `${totalPct}%`,
                  backgroundColor: totalPct > 90 ? "#ef4444" : totalPct > 75 ? "#f59e0b" : "#10b981",
                },
              ]}
            />
          </View>
          <View style={styles.progressMeta}>
            <Text style={styles.metaText}>{totalPct}% used</Text>
            <Text style={styles.metaText}>₹{(totalBudget - totalSpent).toLocaleString("en-IN")} remaining</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* AI Insight Banner */}
        <View style={[styles.aiBanner, { backgroundColor: colors.isDark ? "#1e1b4b" : "#f5f3ff", borderColor: colors.isDark ? "#312e81" : "#ede9fe" }]}>
          <View style={styles.sparkleIconBg}>
            <SparkleIcon size={15} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiTitle, { color: colors.accent }]}>FinPilot AI Insight</Text>
            <Text style={[styles.aiDesc, { color: colors.textSecondary }]}>
              You spent ₹7,500 on food this month — ₹2,500 above your average. Consider meal prepping to cut costs.
            </Text>
          </View>
        </View>

        {/* Category Cards */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Budget Categories</Text>
        {budgets.map((b, i) => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const over = pct > 90;
          const warn = pct > 75;
          const isSelected = i === selected;
          return (
            <Pressable
              key={b.category}
              onPress={() => setSelected(isSelected ? null : i)}
              style={[
                styles.catCard,
                { backgroundColor: colors.cardBg, borderColor: isSelected ? colors.accent : colors.cardBorder },
              ]}
            >
              <View style={styles.catHeader}>
                <View style={[styles.catIconBg, { backgroundColor: `${b.color}18` }]}>
                  <Text style={{ fontSize: 20 }}>{b.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.catNameRow}>
                    <Text style={[styles.catName, { color: colors.textPrimary }]}>{b.category}</Text>
                    <View
                      style={[
                        styles.trendBadge,
                        {
                          backgroundColor: over ? "#fee2e2" : warn ? "#fef3c7" : "#d1fae5",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "500",
                          color: over ? "#dc2626" : warn ? "#d97706" : "#059669",
                        }}
                      >
                        {b.trend}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.spendSubRow}>
                    <Text style={[styles.spentVal, { color: over ? "#ef4444" : colors.textPrimary }]}>
                      ₹{b.spent.toLocaleString("en-IN")}
                    </Text>
                    <Text style={[styles.limitVal, { color: colors.textMuted }]}>of ₹{b.limit.toLocaleString("en-IN")}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.pctVal,
                    { color: over ? "#ef4444" : warn ? "#f59e0b" : "#10b981" },
                  ]}
                >
                  {pct}%
                </Text>
              </View>
              <View style={[styles.track, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: over ? "#ef4444" : warn ? "#f59e0b" : b.color,
                    },
                  ]}
                />
              </View>

              {/* Expanded Detail */}
              {isSelected && (
                <View style={[styles.expandedDetail, { borderTopColor: colors.cardBorder }]}>
                  <View style={styles.detailGrid}>
                    <View style={[styles.detailCard, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                      <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Daily Average</Text>
                      <Text style={[styles.detailVal, { color: colors.textPrimary }]}>₹{Math.round(b.spent / 11).toLocaleString("en-IN")}</Text>
                    </View>
                    <View style={[styles.detailCard, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                      <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Remaining</Text>
                      <Text style={[styles.detailVal, { color: over ? "#ef4444" : "#059669" }]}>
                        ₹{(b.limit - b.spent).toLocaleString("en-IN")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.actionRow}>
                    <Pressable style={[styles.actionBtnLight, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                      <Text style={[styles.actionBtnLightText, { color: colors.textSecondary }]}>View Transactions</Text>
                    </Pressable>
                    <Pressable style={[styles.actionBtnDark, { backgroundColor: colors.accent }]}>
                      <Text style={styles.actionBtnDarkText}>Edit Budget</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Pressable>
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
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  overallCard: { borderRadius: 20, padding: 16, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  progressTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  cardLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)" },
  cardVal: { fontSize: 24, fontWeight: "bold", color: "#ffffff" },
  track: { height: 8, borderRadius: 4, marginVertical: 8 },
  fill: { height: "100%", borderRadius: 4 },
  progressMeta: { flexDirection: "row", justifyContent: "space-between" },
  metaText: { fontSize: 11, color: "rgba(255,255,255,0.5)" },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  aiBanner: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 12, borderRadius: 16, borderWidth: 1 },
  sparkleIconBg: { width: 32, height: 32, borderRadius: 12, backgroundColor: "rgba(124,58,237,0.15)", alignItems: "center", justifyContent: "center" },
  aiTitle: { fontSize: 12, fontWeight: "600", marginBottom: 2 },
  aiDesc: { fontSize: 12, lineHeight: 18 },
  sectionTitle: { fontSize: 14, fontWeight: "600", marginVertical: 4 },
  catCard: { borderRadius: 20, padding: 16, borderWidth: 1, elevation: 1, marginBottom: 4 },
  catHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  catIconBg: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  catNameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  catName: { fontSize: 14, fontWeight: "600" },
  trendBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  spendSubRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  spentVal: { fontSize: 12, fontWeight: "bold" },
  limitVal: { fontSize: 12 },
  pctVal: { fontSize: 14, fontWeight: "bold" },
  expandedDetail: { marginTop: 16, paddingTop: 16, borderTopWidth: 1 },
  detailGrid: { flexDirection: "row", gap: 12, marginBottom: 12 },
  detailCard: { flex: 1, padding: 10, borderRadius: 12 },
  detailLabel: { fontSize: 10 },
  detailVal: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  actionRow: { flexDirection: "row", gap: 8 },
  actionBtnLight: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  actionBtnLightText: { fontSize: 12, fontWeight: "600" },
  actionBtnDark: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  actionBtnDarkText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
});
