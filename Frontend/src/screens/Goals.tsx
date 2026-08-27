import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { PlusIcon, SparkleIcon, CloseIcon } from "../components/ui/Icons";
import { goals } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

function GoalCircle({ pct, color, size = 64, trackColor = "#f1f5f9" }: { pct: number; color: string; size?: number; trackColor?: string }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: "-90deg" }] }}>
      <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth="5" />
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
  const { colors } = useTheme();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const milestones = [25, 50, 75, 100];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={colors.headerBg as [string, string]} style={styles.header}>
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
                  { backgroundColor: colors.cardBg, borderColor: isSelected ? g.color : colors.cardBorder },
                ]}
              >
                <View style={styles.goalMainRow}>
                  <View style={styles.circleWrapper}>
                    <GoalCircle pct={pct} color={g.color} size={64} trackColor={colors.isDark ? "#2a2a36" : "#f1f5f9"} />
                    <View style={styles.emojiOverlay}>
                      <Text style={{ fontSize: 18 }}>{g.icon}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.goalTitle, { color: colors.textPrimary }]}>{g.name}</Text>
                    <Text style={[styles.goalSub, { color: colors.textMuted }]}>Target by {g.deadline}</Text>
                    <View style={styles.valRow}>
                      <Text style={[styles.currVal, { color: g.color }]}>
                        ₹{g.current.toLocaleString("en-IN")}
                      </Text>
                      <Text style={[styles.targetVal, { color: colors.textMuted }]}>/ ₹{g.target.toLocaleString("en-IN")}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.pctText, { color: g.color }]}>{pct}%</Text>
                    <Text style={[styles.completeLabel, { color: colors.textMuted }]}>complete</Text>
                  </View>
                </View>

                {/* Expanded Section */}
                {isSelected && (
                  <View style={[styles.expandedSection, { borderTopColor: colors.cardBorder }]}>
                    <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Milestones</Text>
                    <View style={styles.milestoneRow}>
                      {milestones.map((m) => (
                        <View
                          key={m}
                          style={[
                            styles.milestoneCard,
                            {
                              backgroundColor: pct >= m ? `${g.color}15` : colors.isDark ? "#181820" : "#f8fafc",
                              borderColor: pct >= m ? `${g.color}30` : colors.cardBorder,
                            },
                          ]}
                        >
                          <Text style={{ fontSize: 12 }}>{pct >= m ? "✅" : "⭕"}</Text>
                          <Text style={[styles.milestoneText, { color: pct >= m ? g.color : colors.textMuted }]}>{m}%</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.statsGrid}>
                      <View style={[styles.statBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                        <Text style={[styles.statBoxLabel, { color: colors.textMuted }]}>Monthly Target</Text>
                        <Text style={[styles.statBoxVal, { color: colors.textPrimary }]}>₹{g.monthly.toLocaleString("en-IN")}</Text>
                      </View>
                      <View style={[styles.statBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                        <Text style={[styles.statBoxLabel, { color: colors.textMuted }]}>Remaining</Text>
                        <Text style={[styles.statBoxVal, { color: colors.textPrimary }]}>₹{remaining.toLocaleString("en-IN")}</Text>
                      </View>
                    </View>

                    <View style={[styles.aiPlanCard, { backgroundColor: `${g.color}15` }]}>
                      <View style={styles.aiPlanHeader}>
                        <SparkleIcon size={12} color={g.color} />
                        <Text style={[styles.aiPlanTitle, { color: g.color }]}>AI Plan</Text>
                      </View>
                      <Text style={[styles.aiPlanDesc, { color: colors.textSecondary }]}>
                        Save ₹{g.monthly.toLocaleString("en-IN")}/month to reach your goal by {g.deadline}. You're {pct >= 50 ? "on track!" : "slightly behind — consider increasing monthly contribution."}
                      </Text>
                    </View>

                    <View style={styles.actionRow}>
                      <Pressable style={[styles.actionLight, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                        <Text style={[styles.actionLightText, { color: colors.textSecondary }]}>Add Money</Text>
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

          <Text style={[styles.suggestedTitle, { color: colors.textMuted }]}>Suggested Goals</Text>
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
                style={[styles.suggestedCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
              >
                <Text style={{ fontSize: 26 }}>{s.emoji}</Text>
                <Text style={[styles.suggestedName, { color: colors.textSecondary }]}>{s.name}</Text>
                <Text style={[styles.addGoalLink, { color: colors.accent }]}>+ Add</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add Goal Sheet Modal */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.modalBg }]}>
            <View style={[styles.modalHandle, { backgroundColor: colors.cardBorder }]} />
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>New Goal</Text>
              <Pressable onPress={() => setShowAdd(false)}>
                <CloseIcon size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            {["Goal Name", "Target Amount (₹)", "Current Savings (₹)", "Target Date", "Monthly Contribution (₹)"].map((f) => (
              <View key={f} style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textMuted }]}>{f}</Text>
                <TextInput
                  placeholder={f}
                  placeholderTextColor={colors.textMuted}
                  style={[styles.modalInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textPrimary }]}
                />
              </View>
            ))}

            <Pressable onPress={() => setShowAdd(false)} style={styles.saveBtn}>
              <LinearGradient colors={colors.headerBg as [string, string]} style={styles.saveGradient}>
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
  container: { flex: 1 },
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
  goalCard: { borderRadius: 20, padding: 16, borderWidth: 1, elevation: 1, marginBottom: 4 },
  goalMainRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  circleWrapper: { width: 64, height: 64, alignItems: "center", justifyContent: "center", position: "relative" },
  emojiOverlay: { position: "absolute" },
  goalTitle: { fontSize: 14, fontWeight: "bold" },
  goalSub: { fontSize: 11, marginTop: 2 },
  valRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  currVal: { fontSize: 12, fontWeight: "600" },
  targetVal: { fontSize: 12 },
  pctText: { fontSize: 20, fontWeight: "bold" },
  completeLabel: { fontSize: 10 },
  expandedSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1 },
  sectionLabel: { fontSize: 12, fontWeight: "600", marginBottom: 8 },
  milestoneRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  milestoneCard: { flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  milestoneText: { fontSize: 10, fontWeight: "600", marginTop: 2 },
  statsGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  statBox: { flex: 1, padding: 10, borderRadius: 12 },
  statBoxLabel: { fontSize: 10 },
  statBoxVal: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  aiPlanCard: { borderRadius: 12, padding: 12, marginBottom: 12 },
  aiPlanHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  aiPlanTitle: { fontSize: 12, fontWeight: "600" },
  aiPlanDesc: { fontSize: 12, lineHeight: 18 },
  actionRow: { flexDirection: "row", gap: 8 },
  actionLight: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  actionLightText: { fontSize: 12, fontWeight: "600" },
  actionColor: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  actionColorText: { fontSize: 12, fontWeight: "600", color: "#ffffff" },
  suggestedTitle: { fontSize: 14, fontWeight: "600", marginTop: 8, marginBottom: 4 },
  suggestedScroll: { flexDirection: "row" },
  suggestedCard: { width: 96, borderRadius: 20, padding: 12, alignItems: "center", gap: 4, elevation: 1, marginRight: 12, borderWidth: 1 },
  suggestedName: { fontSize: 10, fontWeight: "500", textAlign: "center" },
  addGoalLink: { fontSize: 10, fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: "600", marginBottom: 4 },
  modalInput: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14 },
  saveBtn: { marginTop: 8, borderRadius: 16, overflow: "hidden" },
  saveGradient: { paddingVertical: 16, alignItems: "center" },
  saveText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
});
