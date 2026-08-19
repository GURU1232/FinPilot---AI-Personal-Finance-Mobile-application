import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { healthBreakdown, healthActionItems } from "../data/mockData";

function ScoreRing({ score }: { score: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <View style={styles.ringWrapper}>
      <Svg width={170} height={170} viewBox="0 0 170 170" style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx="85" cy="85" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
        <Circle
          cx="85"
          cy="85"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.ringCenter}>
        <Text style={styles.scoreBig}>{score}</Text>
        <Text style={styles.scoreMax}>/ 100</Text>
      </View>
    </View>
  );
}

export default function Health() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
        <Text style={styles.title}>Financial Health Score</Text>
        <Text style={styles.subtitle}>Calculated from 4 core financial indicators</Text>

        <View style={styles.scoreRow}>
          <ScoreRing score={78} />
          <View style={styles.scoreMeta}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>🟢 Good Standing</Text>
            </View>
            <Text style={styles.scoreDesc}>
              You are in the top 25% of savers in your income tier. Keep up the consistent savings!
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Breakdown Pillars */}
        <Text style={styles.sectionTitle}>Health Breakdown</Text>
        {healthBreakdown.map((item) => (
          <View key={item.pillar} style={styles.pillarCard}>
            <View style={styles.pillarHeader}>
              <Text style={{ fontSize: 20 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <View style={styles.pillarTitleRow}>
                  <Text style={styles.pillarName}>{item.pillar}</Text>
                  <Text style={[styles.pillarScore, { color: item.status === "excellent" ? "#10b981" : item.status === "good" ? "#60a5fa" : "#f59e0b" }]}>
                    {item.score}/100
                  </Text>
                </View>
                <Text style={styles.pillarDetail}>{item.value} (Benchmark: {item.benchmark})</Text>
              </View>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${item.score}%`,
                    backgroundColor: item.status === "excellent" ? "#10b981" : item.status === "good" ? "#60a5fa" : "#f59e0b",
                  },
                ]}
              />
            </View>
          </View>
        ))}

        {/* Recommended Actions */}
        <Text style={styles.sectionTitle}>High Impact Actions</Text>
        <View style={styles.actionCard}>
          {healthActionItems.map((act, i) => (
            <View key={i} style={[styles.actionRow, i > 0 && styles.borderTop]}>
              <Text style={{ fontSize: 18 }}>{act.impact === "High" ? "🔥" : "⭐"}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>{act.title}</Text>
                <Text style={styles.actionImpact}>+{act.points} pts • {act.impact} Impact</Text>
              </View>
              <Pressable style={styles.actBtn}>
                <Text style={styles.actBtnText}>Do it</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff", textAlign: "center" },
  subtitle: { fontSize: 11, color: "rgba(255,255,255,0.55)", textAlign: "center", marginTop: 4, marginBottom: 20 },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  ringWrapper: { width: 170, height: 170, alignItems: "center", justifyContent: "center", position: "relative" },
  ringCenter: { position: "absolute", alignItems: "center" },
  scoreBig: { fontSize: 40, fontWeight: "bold", color: "#ffffff" },
  scoreMax: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  scoreMeta: { flex: 1, gap: 8 },
  statusBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: "rgba(16,185,129,0.2)" },
  statusText: { fontSize: 12, fontWeight: "bold", color: "#34d399" },
  scoreDesc: { fontSize: 12, lineHeight: 18, color: "rgba(255,255,255,0.7)" },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#64748b", marginVertical: 4 },
  pillarCard: { backgroundColor: "#ffffff", borderRadius: 16, padding: 14, elevation: 1 },
  pillarHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 },
  pillarTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pillarName: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  pillarScore: { fontSize: 14, fontWeight: "bold" },
  pillarDetail: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  track: { height: 6, borderRadius: 3, backgroundColor: "#f1f5f9" },
  fill: { height: "100%", borderRadius: 3 },
  actionCard: { backgroundColor: "#ffffff", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 4, elevation: 1 },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  borderTop: { borderTopWidth: 1, borderTopColor: "#f1f5f9" },
  actionTitle: { fontSize: 13, fontWeight: "600", color: "#0f172a" },
  actionImpact: { fontSize: 11, color: "#6366f1", marginTop: 2 },
  actBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, backgroundColor: "#0f172a" },
  actBtnText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
});
