import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { BellIcon, SparkleIcon } from "../components/ui/Icons";
import { user, transactions, budgets, goals, cashflowData } from "../data/mockData";

function CircularScore({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <View style={styles.scoreContainer}>
      <Svg width={128} height={128} viewBox="0 0 128 128" style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
        <Circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.scoreOverlay}>
        <Text style={styles.scoreText}>{score}</Text>
        <Text style={styles.scoreSubtext}>/ 100</Text>
      </View>
    </View>
  );
}

function MiniBarChart() {
  const max = Math.max(...cashflowData.map(d => Math.max(d.income, d.expenses)));
  return (
    <View style={styles.chartContainer}>
      {cashflowData.map((d, i) => (
        <View key={i} style={styles.chartColumn}>
          <View style={styles.barPair}>
            <View
              style={[
                styles.incomeBar,
                { height: `${(d.income / max) * 100}%` },
              ]}
            />
            <View
              style={[
                styles.expenseBar,
                { height: `${(d.expenses / max) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.monthLabel}>{d.month}</Text>
        </View>
      ))}
    </View>
  );
}

export default function Home({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [showNotif, setShowNotif] = useState(false);

  const fmt = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;

  const aiInsights = [
    { icon: "🍔", text: "Food spending up 8% this month", type: "warning" },
    { icon: "💚", text: "Savings goal on track!", type: "success" },
    { icon: "💳", text: "Credit card due in 5 days", type: "alert" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greetingText}>Good morning</Text>
            {/* <Text style={styles.userName}>{user.firstName} </Text> */}
          </View>
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => setShowNotif(!showNotif)}
              style={styles.iconBtn}
            >
              <BellIcon size={20} color="#ffffff" />
              <View style={styles.notifBadge} />
            </Pressable>
            <View style={styles.avatarBtn}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
          </View>
        </View>

        {/* Health Score + Stats */}
        <View style={styles.healthCard}>
          <View style={styles.healthRow}>
            <CircularScore score={user.healthScore} />
            <View style={styles.healthStats}>
              <Text style={styles.healthLabel}>Financial Health</Text>
              <Text style={styles.healthTitle}>Good Standing</Text>
              <View style={styles.statList}>
                <View style={styles.statRow}>
                  <Text style={styles.statSubLabel}>Income</Text>
                  <Text style={[styles.statVal, { color: "#34d399" }]}>{fmt(user.income)}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statSubLabel}>Expenses</Text>
                  <Text style={[styles.statVal, { color: "#f87171" }]}>{fmt(user.expenses)}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statSubLabel}>Savings</Text>
                  <Text style={[styles.statVal, { color: "#60a5fa" }]}>{fmt(user.savings)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Cashflow Chart */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Cash Flow</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#10b981" }]} />
                <Text style={styles.legendText}>Income</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "#ef4444" }]} />
                <Text style={styles.legendText}>Expenses</Text>
              </View>
            </View>
          </View>
          <MiniBarChart />
        </View>

        {/* Budget Preview */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Budget This Month</Text>
            <Pressable onPress={() => onNavigate("budget")}>
              <Text style={styles.linkText}>View all</Text>
            </Pressable>
          </View>
          <View style={styles.budgetList}>
            {budgets.slice(0, 3).map((b) => {
              const pct = Math.round((b.spent / b.limit) * 100);
              const over = pct > 90;
              return (
                <View key={b.category} style={styles.budgetItem}>
                  <View style={styles.budgetRow}>
                    <View style={styles.budgetCat}>
                      <Text style={{ fontSize: 14 }}>{b.icon}</Text>
                      <Text style={styles.budgetName}>{b.category}</Text>
                    </View>
                    <Text style={[styles.budgetAmount, { color: over ? "#ef4444" : "#0f172a" }]}>
                      ₹{b.spent.toLocaleString("en-IN")}
                      <Text style={{ color: "#94a3b8", fontWeight: "normal" }}>/{b.limit.toLocaleString("en-IN")}</Text>
                    </Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${Math.min(pct, 100)}%`,
                          backgroundColor: over ? "#ef4444" : pct > 75 ? "#f59e0b" : "#10b981",
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Goals Preview */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Goals Progress</Text>
            <Pressable onPress={() => onNavigate("goals")}>
              <Text style={styles.linkText}>View all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {goals.slice(0, 3).map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <View key={g.id} style={styles.goalMiniCard}>
                  <Text style={{ fontSize: 20 }}>{g.icon}</Text>
                  <Text style={styles.goalName} numberOfLines={1}>{g.name}</Text>
                  <View style={styles.goalTrack}>
                    <View style={[styles.goalBar, { width: `${pct}%`, backgroundColor: g.color }]} />
                  </View>
                  <Text style={[styles.goalPct, { color: g.color }]}>{pct}%</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* AI Insights */}
        <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.sparkleBadge}>
              <SparkleIcon size={14} color="#a78bfa" />
            </View>
            <Text style={styles.aiTitle}>FinPilot Insights</Text>
          </View>
          <View style={styles.insightList}>
            {aiInsights.map((ins, i) => (
              <View
                key={i}
                style={[
                  styles.insightItem,
                  {
                    backgroundColor:
                      ins.type === "warning" ? "rgba(245,158,11,0.12)"
                      : ins.type === "success" ? "rgba(16,185,129,0.12)"
                      : "rgba(239,68,68,0.12)",
                  },
                ]}
              >
                <Text style={{ fontSize: 14 }}>{ins.icon}</Text>
                <Text style={styles.insightText}>{ins.text}</Text>
              </View>
            ))}
          </View>
          <Pressable onPress={() => onNavigate("ai")}>
            <LinearGradient colors={["#7c3aed", "#6366f1"]} style={styles.askAiBtn}>
              <SparkleIcon size={16} color="#ffffff" />
              <Text style={styles.askAiText}>Ask FinPilot AI</Text>
            </LinearGradient>
          </Pressable>
        </LinearGradient>

        {/* Recent Transactions */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            <Pressable onPress={() => onNavigate("transactions")}>
              <Text style={styles.linkText}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.txList}>
            {transactions.slice(0, 4).map((t) => (
              <View key={t.id} style={styles.txItem}>
                <View style={[styles.txIconBg, { backgroundColor: `${t.color}18` }]}>
                  <Text style={{ fontSize: 16 }}>{t.icon}</Text>
                </View>
                <View style={styles.txMeta}>
                  <Text style={styles.txMerchant} numberOfLines={1}>{t.merchant}</Text>
                  <Text style={styles.txSub}>{t.category} • {t.date}</Text>
                </View>
                <Text style={[styles.txAmount, { color: t.amount > 0 ? "#059669" : "#0f172a" }]}>
                  {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.quickGrid}>
          {[
            { label: "Debt", emoji: "💳", id: "debt" },
            { label: "Reports", emoji: "📊", id: "reports" },
            { label: "Health", emoji: "❤️", id: "health" },
            { label: "Profile", emoji: "👤", id: "profile" },
          ].map((q) => (
            <Pressable key={q.id} onPress={() => onNavigate(q.id)} style={styles.quickCard}>
              <Text style={{ fontSize: 22 }}>{q.emoji}</Text>
              <Text style={styles.quickLabel}>{q.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  greetingText: { fontSize: 14, color: "rgba(255,255,255,0.55)" },
  userName: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", position: "relative" },
  notifBadge: { position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" },
  avatarBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#6366f1", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 14, fontWeight: "bold", color: "#ffffff" },
  healthCard: { borderRadius: 20, padding: 16, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  healthRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  scoreContainer: { width: 128, height: 128, alignItems: "center", justifyContent: "center", position: "relative" },
  scoreOverlay: { position: "absolute", alignItems: "center" },
  scoreText: { fontSize: 28, fontWeight: "bold", color: "#ffffff" },
  scoreSubtext: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  healthStats: { flex: 1 },
  healthLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 2 },
  healthTitle: { fontSize: 18, fontWeight: "bold", color: "#ffffff", marginBottom: 12 },
  statList: { gap: 6 },
  statRow: { flexDirection: "row", justifyContent: "space-between" },
  statSubLabel: { fontSize: 11, color: "rgba(255,255,255,0.5)" },
  statVal: { fontSize: 12, fontWeight: "600" },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 20 },
  card: { backgroundColor: "#ffffff", borderRadius: 20, padding: 16, elevation: 2, shadowColor: "#0f172a", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  linkText: { fontSize: 12, fontWeight: "500", color: "#6366f1" },
  legendRow: { flexDirection: "row", gap: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10, color: "#64748b" },
  chartContainer: { flexDirection: "row", alignItems: "flex-end", height: 64, gap: 6 },
  chartColumn: { flex: 1, alignItems: "center", gap: 4 },
  barPair: { flex: 1, width: "100%", flexDirection: "row", alignItems: "flex-end", gap: 2, height: 48 },
  incomeBar: { flex: 1, borderRadius: 2, backgroundColor: "#10b981", opacity: 0.9 },
  expenseBar: { flex: 1, borderRadius: 2, backgroundColor: "#ef4444", opacity: 0.7 },
  monthLabel: { fontSize: 9, color: "rgba(15,23,42,0.5)" },
  budgetList: { gap: 12 },
  budgetItem: { gap: 4 },
  budgetRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  budgetCat: { flexDirection: "row", alignItems: "center", gap: 8 },
  budgetName: { fontSize: 12, fontWeight: "500", color: "#334155" },
  budgetAmount: { fontSize: 12, fontWeight: "600" },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#f1f5f9" },
  progressBar: { height: "100%", borderRadius: 3 },
  horizontalScroll: { flexDirection: "row" },
  goalMiniCard: { width: 112, borderRadius: 16, padding: 12, backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#f1f5f9", marginRight: 12 },
  goalName: { fontSize: 12, fontWeight: "500", color: "#334155", marginTop: 4, marginBottom: 8 },
  goalTrack: { height: 6, borderRadius: 3, backgroundColor: "#e2e8f0", marginBottom: 6 },
  goalBar: { height: "100%", borderRadius: 3 },
  goalPct: { fontSize: 12, fontWeight: "bold" },
  aiCard: { borderRadius: 20, padding: 16 },
  aiHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sparkleBadge: { width: 24, height: 24, borderRadius: 8, backgroundColor: "rgba(99,102,241,0.3)", alignItems: "center", justifyContent: "center" },
  aiTitle: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  insightList: { gap: 8, marginBottom: 16 },
  insightItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  insightText: { fontSize: 12, color: "rgba(255,255,255,0.8)" },
  askAiBtn: { paddingVertical: 12, borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  askAiText: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  txList: { gap: 8 },
  txItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6 },
  txIconBg: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  txMeta: { flex: 1 },
  txMerchant: { fontSize: 12, fontWeight: "600", color: "#0f172a" },
  txSub: { fontSize: 10, color: "#94a3b8" },
  txAmount: { fontSize: 12, fontWeight: "bold" },
  quickGrid: { flexDirection: "row", gap: 8, paddingBottom: 16 },
  quickCard: { flex: 1, backgroundColor: "#ffffff", borderRadius: 16, padding: 12, alignItems: "center", gap: 6, elevation: 1 },
  quickLabel: { fontSize: 10, fontWeight: "500", color: "#64748b" },
});
