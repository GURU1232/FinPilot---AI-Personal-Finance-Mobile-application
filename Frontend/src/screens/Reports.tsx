import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { SparkleIcon } from "../components/ui/Icons";
import { categorySpend, reportsMonthlyData } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

function BarChart({ textMutedColor }: { textMutedColor: string }) {
  const max = Math.max(...reportsMonthlyData.map(d => Math.max(d.income, d.expenses)));
  return (
    <View style={styles.chartBox}>
      <View style={styles.chartBars}>
        {reportsMonthlyData.map((d, i) => (
          <View key={i} style={styles.chartCol}>
            <View style={styles.barPair}>
              <View style={[styles.bar, { height: `${(d.income / max) * 100}%`, backgroundColor: "#10b981" }]} />
              <View style={[styles.bar, { height: `${(d.expenses / max) * 100}%`, backgroundColor: "#ef4444" }]} />
            </View>
            <Text style={[styles.barMonth, { color: textMutedColor }]}>{d.month}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function DonutChart({ textPrimaryColor, textMutedColor }: { textPrimaryColor: string; textMutedColor: string }) {
  const size = 160;
  const cx = 80;
  const cy = 80;
  const r = 56;
  const total = categorySpend.reduce((a, c) => a + c.amount, 0);

  let currentAngle = 0;
  const slices = categorySpend.map((c) => {
    const angle = (c.amount / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
    const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);

    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...c, path };
  });

  return (
    <View style={styles.donutWrapper}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <Path key={i} d={s.path} fill={s.color} />
        ))}
      </Svg>
      <View style={styles.donutCenter}>
        <Text style={[styles.donutTotalLabel, { color: textMutedColor }]}>Spent</Text>
        <Text style={[styles.donutTotalVal, { color: textPrimaryColor }]}>₹34.5k</Text>
      </View>
    </View>
  );
}

export default function Reports() {
  const { colors } = useTheme();
  const [monthIndex, setMonthIndex] = useState(0);
  const months = ["August 2024", "July 2024", "June 2024"];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={colors.headerBg as [string, string]} style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Monthly Reports</Text>
        </View>

        {/* Month Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
          {months.map((m, i) => (
            <Pressable
              key={i}
              onPress={() => setMonthIndex(i)}
              style={[
                styles.monthPill,
                { backgroundColor: i === monthIndex ? "#ffffff" : "rgba(255,255,255,0.1)" },
              ]}
            >
              <Text style={[styles.monthText, { color: i === monthIndex ? "#0f172a" : "rgba(255,255,255,0.7)" }]}>
                {m}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: "rgba(16,185,129,0.15)" }]}>
            <Text style={styles.statLabel}>Net Savings</Text>
            <Text style={[styles.statVal, { color: "#34d399" }]}>+₹15,500</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "rgba(96,165,250,0.15)" }]}>
            <Text style={styles.statLabel}>Savings Rate</Text>
            <Text style={[styles.statVal, { color: "#60a5fa" }]}>31%</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "rgba(245,158,11,0.15)" }]}>
            <Text style={styles.statLabel}>Largest Category</Text>
            <Text style={[styles.statVal, { color: "#fbbf24" }]}>Rent (43%)</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Income vs Expenses Bar Chart */}
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Income vs Expenses</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#10b981" }]} />
                <Text style={[styles.legendText, { color: colors.textMuted }]}>Income</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#ef4444" }]} />
                <Text style={[styles.legendText, { color: colors.textMuted }]}>Expenses</Text>
              </View>
            </View>
          </View>
          <BarChart textMutedColor={colors.textMuted} />
        </View>

        {/* Donut Category Spend */}
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Spending Distribution</Text>
          <View style={styles.donutRow}>
            <DonutChart textPrimaryColor={colors.textPrimary} textMutedColor={colors.textMuted} />
            <View style={styles.categoryLegend}>
              {categorySpend.map((c) => (
                <View key={c.category} style={styles.catLegendItem}>
                  <View style={[styles.legendDot, { backgroundColor: c.color }]} />
                  <Text style={[styles.catLegendName, { color: colors.textSecondary }]} numberOfLines={1}>{c.category}</Text>
                  <Text style={[styles.catLegendPct, { color: colors.textPrimary }]}>{c.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* AI Executive Summary */}
        <View style={[styles.aiSummaryCard, { backgroundColor: colors.isDark ? "#1e1b4b" : "#f5f3ff", borderColor: colors.isDark ? "#312e81" : "#ede9fe" }]}>
          <View style={styles.aiSummaryHeader}>
            <SparkleIcon size={16} color={colors.accent} />
            <Text style={[styles.aiSummaryTitle, { color: colors.accent }]}>FinPilot Executive Summary</Text>
          </View>
          <Text style={[styles.aiSummaryText, { color: colors.textSecondary }]}>
            Great month! You saved 31% of your income — exceeding your 20% target. Your largest discretionary expense was Dining & Entertainment (₹7,500). Reallocating ₹2,000 from dining to your Emergency Fund will accelerate your target by 3 weeks.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  monthScroll: { flexDirection: "row", marginBottom: 16 },
  monthPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  monthText: { fontSize: 12, fontWeight: "500" },
  statsGrid: { flexDirection: "row", gap: 8 },
  statCard: { flex: 1, padding: 12, borderRadius: 14 },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.6)" },
  statVal: { fontSize: 14, fontWeight: "bold", marginTop: 4 },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 16 },
  card: { borderRadius: 20, padding: 16, borderWidth: 1, elevation: 1 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "600" },
  legendRow: { flexDirection: "row", gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10 },
  chartBox: { height: 120, paddingTop: 10 },
  chartBars: { flexDirection: "row", height: 90, alignItems: "flex-end", gap: 8 },
  chartCol: { flex: 1, alignItems: "center", gap: 4 },
  barPair: { flexDirection: "row", flex: 1, alignItems: "flex-end", gap: 3 },
  bar: { flex: 1, borderRadius: 3 },
  barMonth: { fontSize: 9 },
  donutRow: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 12 },
  donutWrapper: { width: 160, height: 160, alignItems: "center", justifyContent: "center", position: "relative" },
  donutCenter: { position: "absolute", alignItems: "center" },
  donutTotalLabel: { fontSize: 10 },
  donutTotalVal: { fontSize: 18, fontWeight: "bold" },
  categoryLegend: { flex: 1, gap: 8 },
  catLegendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  catLegendName: { flex: 1, fontSize: 11 },
  catLegendPct: { fontSize: 11, fontWeight: "bold" },
  aiSummaryCard: { borderRadius: 20, padding: 16, borderWidth: 1 },
  aiSummaryHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  aiSummaryTitle: { fontSize: 14, fontWeight: "600" },
  aiSummaryText: { fontSize: 12, lineHeight: 20 },
});
