import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { PlusIcon, SparkleIcon, CloseIcon } from "../components/ui/Icons";
import { goals } from "../data/mockData";

function GoalCircle({ pct, color, size = 64 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: "-90deg" }] }}>
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth="5" />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${circ}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function Goals() {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const milestones = [25, 50, 75, 100];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.title}>Goals</Text>
              <Text style={styles.subtitle}>3 of 4 goals on track</Text>
            </View>
            <Pressable onPress={() => setShowAdd(true)} style={styles.newGoalBtn}>
              <PlusIcon size={16} color="#ffffff" />
              <Text style={styles.newGoalText}>New Goal</Text>
            </Pressable>
          </View>

          {/* Summary Pills */}
          <View style={styles.summaryRow}>
            {[
              { label: "Total Saved", value: "₹2,00,750", color: "#34d399" },
              { label: "Monthly Saving", value: "₹27,000", color: "#60a5fa" },
            ].map((s) => (
              <View key={s.label} style={styles.summaryPill}>
                <Text style={styles.summaryLabel}>{s.label}</Text>
                <Text style={[styles.summaryVal, { color: s.color }]}>{s.value}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {goals.map((g, i) => {
            const pct = Math.round((g.current / g.target) * 100);
            const remaining = g.target - g.current;
            const isSelected = selectedGoal === i;
            return (
              <Pressable
                key={g.id}
                onPress={() => setSelectedGoal(isSelected ? null : i)}
                style={[
                  styles.goalCard,
                  { borderColor: isSelected ? g.color : "transparent" },
                ]}
              >
                <View style={styles.goalMainRow}>
                  <View style={styles.circleWrapper}>
                    <GoalCircle pct={pct} color={g.color} size={64} />
                    <View style={styles.emojiOverlay}>
                      <Text style={{ fontSize: 18 }}>{g.icon}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goalTitle}>{g.name}</Text>
                    <Text style={styles.goalSub}>Target by {g.deadline}</Text>
                    <View style={styles.valRow}>
                      <Text style={[styles.currVal, { color: g.color }]}>
                        ₹{g.current.toLocaleString("en-IN")}
                      </Text>
                      <Text style={styles.targetVal}>/ ₹{g.target.toLocaleString("en-IN")}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.pctText, { color: g.color }]}>{pct}%</Text>
                    <Text style={styles.completeLabel}>complete</Text>
                  </View>
                </View>

                {/* Expanded Section */}
                {isSelected && (
                  <View style={styles.expandedSection}>
                    <Text style={styles.sectionLabel}>Milestones</Text>
                    <View style={styles.milestoneRow}>
                      {milestones.map((m) => (
                        <View
                          key={m}
                          style={[
                            styles.milestoneCard,
                            {
                              backgroundColor: pct >= m ? `${g.color}15` : "#f8fafc",
                              borderColor: pct >= m ? `${g.color}30` : "#f1f5f9",
                            },
                          ]}
                        >
                          <Text style={{ fontSize: 12 }}>{pct >= m ? "✅" : "⭕"}</Text>
                          <Text style={[styles.milestoneText, { color: pct >= m ? g.color : "#94a3b8" }]}>{m}%</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.statsGrid}>
                      <View style={styles.statBox}>
                        <Text style={styles.statBoxLabel}>Monthly Target</Text>
                        <Text style={styles.statBoxVal}>₹{g.monthly.toLocaleString("en-IN")}</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statBoxLabel}>Remaining</Text>
                        <Text style={styles.statBoxVal}>₹{remaining.toLocaleString("en-IN")}</Text>
                      </View>
                    </View>

                    <View style={[styles.aiPlanCard, { backgroundColor: `${g.color}10` }]}>
                      <View style={styles.aiPlanHeader}>
                        <SparkleIcon size={12} color={g.color} />
                        <Text style={[styles.aiPlanTitle, { color: g.color }]}>AI Plan</Text>
                      </View>
                      <Text style={styles.aiPlanDesc}>
                        Save ₹{g.monthly.toLocaleString("en-IN")}/month to reach your goal by {g.deadline}. You're {pct >= 50 ? "on track!" : "slightly behind — consider increasing monthly contribution."}
                      </Text>
                    </View>

                    <View style={styles.actionRow}>
                      <Pressable style={styles.actionLight}>
                        <Text style={styles.actionLightText}>Add Money</Text>
                      </Pressable>
                      <Pressable style={[styles.actionColor, { backgroundColor: g.color }]}>
                        <Text style={styles.actionColorText}>Edit Goal</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}

          <Text style={styles.suggestedTitle}>Suggested Goals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestedScroll}>
            {[
              { emoji: "🏠", name: "Home Down Payment" },
              { emoji: "📚", name: "Education Fund" },
              { emoji: "✈️", name: "Europe Vacation" },
              { emoji: "👴", name: "Retirement Fund" },
            ].map((s) => (
              <Pressable
                key={s.name}
                onPress={() => setShowAdd(true)}
                style={styles.suggestedCard}
              >
                <Text style={{ fontSize: 26 }}>{s.emoji}</Text>
                <Text style={styles.suggestedName}>{s.name}</Text>
                <Text style={styles.addGoalLink}>+ Add</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add Goal Sheet Modal */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Goal</Text>
              <Pressable onPress={() => setShowAdd(false)}>
                <CloseIcon size={20} color="#94a3b8" />
              </Pressable>
            </View>

            {["Goal Name", "Target Amount (₹)", "Current Savings (₹)", "Target Date", "Monthly Contribution (₹)"].map((f) => (
              <View key={f} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{f}</Text>
                <TextInput
                  placeholder={f}
                  placeholderTextColor="#94a3b8"
                  style={styles.modalInput}
                />
              </View>
            ))}

            <Pressable onPress={() => setShowAdd(false)} style={styles.saveBtn}>
              <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.saveGradient}>
                <Text style={styles.saveText}>Create Goal</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  subtitle: { fontSize: 12, color: "rgba(255,255,255,0.55)" },
  newGoalBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)" },
  newGoalText: { fontSize: 14, fontWeight: "500", color: "#ffffff" },
  summaryRow: { flexDirection: "row", gap: 8 },
  summaryPill: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.08)" },
  summaryLabel: { fontSize: 10, color: "rgba(255,255,255,0.55)" },
  summaryVal: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  goalCard: { backgroundColor: "#ffffff", borderRadius: 20, padding: 16, borderWidth: 2, elevation: 1, marginBottom: 4 },
  goalMainRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  circleWrapper: { width: 64, height: 64, alignItems: "center", justifyContent: "center", position: "relative" },
  emojiOverlay: { position: "absolute" },
  goalTitle: { fontSize: 14, fontWeight: "bold", color: "#0f172a" },
  goalSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  valRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  currVal: { fontSize: 12, fontWeight: "600" },
  targetVal: { fontSize: 12, color: "#94a3b8" },
  pctText: { fontSize: 20, fontWeight: "bold" },
  completeLabel: { fontSize: 10, color: "#94a3b8" },
  expandedSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#f1f5f9" },
  sectionLabel: { fontSize: 12, fontWeight: "600", color: "#64748b", marginBottom: 8 },
  milestoneRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  milestoneCard: { flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  milestoneText: { fontSize: 10, fontWeight: "600", marginTop: 2 },
  statsGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  statBox: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: "#f8fafc" },
  statBoxLabel: { fontSize: 10, color: "#94a3b8" },
  statBoxVal: { fontSize: 14, fontWeight: "bold", color: "#0f172a", marginTop: 2 },
  aiPlanCard: { borderRadius: 12, padding: 12, marginBottom: 12 },
  aiPlanHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  aiPlanTitle: { fontSize: 12, fontWeight: "600" },
  aiPlanDesc: { fontSize: 12, lineHeight: 18, color: "#334155" },
  actionRow: { flexDirection: "row", gap: 8 },
  actionLight: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: "#f1f5f9", alignItems: "center" },
  actionLightText: { fontSize: 12, fontWeight: "600", color: "#64748b" },
  actionColor: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  actionColorText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
  suggestedTitle: { fontSize: 14, fontWeight: "600", color: "#64748b", marginTop: 8, marginBottom: 4 },
  suggestedScroll: { flexDirection: "row" },
  suggestedCard: { width: 96, backgroundColor: "#ffffff", borderRadius: 20, padding: 12, alignItems: "center", gap: 4, elevation: 1, marginRight: 12 },
  suggestedName: { fontSize: 10, fontWeight: "500", color: "#64748b", textAlign: "center" },
  addGoalLink: { fontSize: 10, color: "#6366f1", fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#ffffff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0", alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: "600", color: "#64748b", marginBottom: 4 },
  modalInput: { borderWidth: 1.5, borderColor: "#e2e8f0", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: "#0f172a" },
  saveBtn: { marginTop: 8, borderRadius: 16, overflow: "hidden" },
  saveGradient: { paddingVertical: 16, alignItems: "center" },
  saveText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
});
