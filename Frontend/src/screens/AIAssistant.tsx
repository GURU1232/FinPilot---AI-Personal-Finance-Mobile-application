import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SparkleIcon, CheckIcon } from "../components/ui/Icons";
import { useTheme } from "../context/ThemeContext";

const prompts = [
  { emoji: "📱", text: "Can I afford a ₹60,000 phone?" },
  { emoji: "💰", text: "How much can I save this month?" },
  { emoji: "📊", text: "Where am I spending the most?" },
  { emoji: "🎯", text: "How to reach ₹2L in 10 months?" },
  { emoji: "💳", text: "Which debt should I pay first?" },
  { emoji: "📈", text: "Analyze my spending patterns" },
];

const analysisSteps = [
  { label: "Checking income & cash flow" },
  { label: "Analyzing expense patterns" },
  { label: "Reviewing active EMIs" },
  { label: "Calculating savings capacity" },
  { label: "Assessing goal impacts" },
  { label: "Generating recommendation" },
];

type ResultType = {
  question: string;
  recommendation: string;
  color: string;
  impact: string;
  risk: string;
  surplus: string;
  amount: string;
  explanation: string;
};

const resultTemplates: Record<string, ResultType> = {
  "Can I afford a ₹60,000 phone?": {
    question: "Can I afford a ₹60,000 phone?",
    recommendation: "Wait 2 Months",
    color: "#f59e0b",
    impact: "Delays Emergency Fund by 6 weeks",
    risk: "Medium — stretches savings this month",
    surplus: "₹8,200 monthly surplus",
    amount: "₹60,000",
    explanation: "Your current monthly surplus is ₹8,200. Buying now would deplete your liquid savings to ₹3,300 — below your 1-month emergency buffer. In 2 months you'll have ₹16,400 more, making this purchase comfortable without impacting your goals.",
  },
  "How much can I save this month?": {
    question: "How much can I save this month?",
    recommendation: "₹15,500 possible",
    color: "#10b981",
    impact: "Emergency Fund reaches 75% by month end",
    risk: "Low — well within budget",
    surplus: "₹15,500 projected savings",
    amount: "₹15,500",
    explanation: "Based on your income of ₹50,000 and current expense trajectory of ₹34,500, you're on track to save ₹15,500 this month — a 31% savings rate. This is above the recommended 20% benchmark.",
  },
};

export default function AIAssistant() {
  const { colors } = useTheme();
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [stepsDone, setStepsDone] = useState(0);
  const [result, setResult] = useState<ResultType | null>(null);
  const [customInput, setCustomInput] = useState("");

  const handlePrompt = (text: string) => {
    setSelectedPrompt(text);
    setAnalyzing(true);
    setResult(null);
    setStepsDone(0);

    analysisSteps.forEach((_, i) => {
      setTimeout(() => {
        setStepsDone(i + 1);
        if (i === analysisSteps.length - 1) {
          setTimeout(() => {
            setAnalyzing(false);
            setResult(resultTemplates[text] || resultTemplates["Can I afford a ₹60,000 phone?"]);
          }, 3000);
        }
      }, i * 500 + 1000);
    });
  };

  const reset = () => {
    setSelectedPrompt(null);
    setAnalyzing(false);
    setResult(null);
    setStepsDone(0);
    setCustomInput("");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#4c1d95", "#7c3aed", "#6366f1"]} style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.iconBg}>
            <SparkleIcon size={22} color="#ffffff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>FinPilot AI</Text>
            <Text style={styles.subtitle}>Your financial planning agent</Text>
          </View>
          {selectedPrompt && (
            <Pressable onPress={reset} style={styles.newQueryBtn}>
              <Text style={styles.newQueryText}>New Query</Text>
            </Pressable>
          )}
        </View>

        {!selectedPrompt && (
          <View style={styles.inputBox}>
            <SparkleIcon size={16} color="rgba(255,255,255,0.7)" />
            <TextInput
              value={customInput}
              onChangeText={setCustomInput}
              onSubmitEditing={() => { if (customInput.trim()) handlePrompt(customInput.trim()); }}
              placeholder="Ask anything about your finances..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />
          </View>
        )}
      </LinearGradient>

      <View style={styles.body}>
        {/* Prompt Suggestions */}
        {!selectedPrompt && (
          <>
            <Text style={[styles.tryTitle, { color: colors.textMuted }]}>Try asking...</Text>
            <View style={styles.promptList}>
              {prompts.map((p) => (
                <Pressable key={p.text} onPress={() => handlePrompt(p.text)} style={[styles.promptCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                  <Text style={{ fontSize: 20 }}>{p.emoji}</Text>
                  <Text style={[styles.promptText, { color: colors.textPrimary }]}>{p.text}</Text>
                  <Text style={[styles.arrowText, { color: colors.accent }]}>›</Text>
                </Pressable>
              ))}
            </View>

            <View style={[styles.disclaimerBox, { backgroundColor: colors.isDark ? "#291e08" : "#fef3c7", borderColor: colors.isDark ? "#453006" : "#fde68a" }]}>
              <Text style={[styles.disclaimerText, { color: colors.isDark ? "#fef08a" : "#92400e" }]}>
                ⚠️ <Text style={{ fontWeight: "bold" }}>Disclaimer:</Text> FinPilot provides educational financial planning insights only. This is not guaranteed financial advice.
              </Text>
            </View>
          </>
        )}

        {/* Analyzing */}
        {analyzing && selectedPrompt && (
          <View style={{ gap: 16 }}>
            <View style={[styles.queryCard, { backgroundColor: colors.isDark ? "#1e1b4b" : "#f5f3ff", borderColor: colors.isDark ? "#312e81" : "#ede9fe" }]}>
              <Text style={[styles.queryLabel, { color: colors.accent }]}>Query</Text>
              <Text style={[styles.queryText, { color: colors.textPrimary }]}>{selectedPrompt}</Text>
            </View>

            <View style={[styles.analyzingCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.analyzingHeader}>
                <LinearGradient colors={["#7c3aed", "#6366f1"]} style={styles.sparkleSmallBg}>
                  <SparkleIcon size={14} color="#ffffff" />
                </LinearGradient>
                <Text style={[styles.analyzingTitle, { color: colors.textPrimary }]}>Analyzing your finances...</Text>
              </View>
              <View style={styles.stepList}>
                {analysisSteps.map((step, i) => (
                  <View key={i} style={styles.stepRow}>
                    <View
                      style={[
                        styles.stepDot,
                        {
                          backgroundColor: i < stepsDone ? "#10b981" : i === stepsDone ? "#6366f1" : colors.isDark ? "#2a2a36" : "#f1f5f9",
                        },
                      ]}
                    >
                      {i < stepsDone ? (
                        <CheckIcon size={10} color="#ffffff" />
                      ) : i === stepsDone ? (
                        <View style={styles.pulseInner} />
                      ) : (
                        <View style={[styles.grayDot, { backgroundColor: colors.textMuted }]} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        {
                          color: i < stepsDone ? "#059669" : i === stepsDone ? "#6366f1" : colors.textMuted,
                          fontWeight: i <= stepsDone ? "600" : "400",
                        },
                      ]}
                    >
                      {step.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Result Card */}
        {result && !analyzing && (
          <View style={{ gap: 16 }}>
            <View style={[styles.queryCard, { backgroundColor: colors.isDark ? "#1e1b4b" : "#f5f3ff", borderColor: colors.isDark ? "#312e81" : "#ede9fe" }]}>
              <Text style={[styles.queryLabel, { color: colors.accent }]}>Your Query</Text>
              <Text style={[styles.queryText, { color: colors.textPrimary }]}>{result.question}</Text>
            </View>

            <View style={[styles.resultCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.recHeader}>
                <View style={[styles.recIconBg, { backgroundColor: `${result.color}18` }]}>
                  <SparkleIcon size={22} color={result.color} />
                </View>
                <View>
                  <Text style={[styles.recLabel, { color: colors.textMuted }]}>AI Recommendation</Text>
                  <Text style={[styles.recTitle, { color: result.color }]}>{result.recommendation}</Text>
                </View>
              </View>

              <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{result.explanation}</Text>

              <View style={styles.metricGrid}>
                <View style={[styles.metricBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Monthly Surplus</Text>
                  <Text style={[styles.metricVal, { color: "#059669" }]}>{result.surplus}</Text>
                </View>
                <View style={[styles.metricBox, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Amount</Text>
                  <Text style={[styles.metricVal, { color: colors.textPrimary }]}>{result.amount}</Text>
                </View>
                <View style={[styles.metricBox, { width: "100%", backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
                  <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Goal Impact</Text>
                  <Text style={[styles.metricVal, { color: colors.textPrimary, fontSize: 12 }]}>{result.impact}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.riskBadge,
                  {
                    backgroundColor:
                      result.risk.includes("Low")
                        ? colors.isDark ? "#064e3b" : "#d1fae5"
                        : result.risk.includes("Medium")
                        ? colors.isDark ? "#78350f" : "#fef3c7"
                        : colors.isDark ? "#7f1d1d" : "#fee2e2",
                  },
                ]}
              >
                <Text style={{ fontSize: 14 }}>
                  {result.risk.includes("Low") ? "🟢" : result.risk.includes("Medium") ? "🟡" : "🔴"}
                </Text>
                <Text style={[styles.riskText, { color: colors.textPrimary }]}>Risk: {result.risk}</Text>
              </View>
            </View>

            {/* Calculations */}
            <View style={[styles.calcCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.calcTitle, { color: colors.textMuted }]}>How I calculated this</Text>
              <View style={styles.calcList}>
                {analysisSteps.map((s) => (
                  <View key={s.label} style={styles.calcRow}>
                    <View style={styles.calcCheck}>
                      <CheckIcon size={8} color="#059669" />
                    </View>
                    <Text style={[styles.calcText, { color: colors.textSecondary }]}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ gap: 8 }}>
              <Pressable style={styles.planBtn}>
                <LinearGradient colors={["#7c3aed", "#6366f1"]} style={styles.planGradient}>
                  <Text style={styles.planBtnText}>Create Financial Plan</Text>
                </LinearGradient>
              </Pressable>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable style={[styles.subBtn, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                  <Text style={[styles.subBtnText, { color: colors.textSecondary }]}>Save Insight</Text>
                </Pressable>
                <Pressable onPress={reset} style={[styles.subBtn, { backgroundColor: colors.isDark ? "#2a2a36" : "#f1f5f9" }]}>
                  <Text style={[styles.subBtnText, { color: colors.textSecondary }]}>Ask Another</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  iconBg: { width: 40, height: 40, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  subtitle: { fontSize: 11, color: "rgba(255,255,255,0.65)" },
  newQueryBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)" },
  newQueryText: { fontSize: 12, fontWeight: "500", color: "#ffffff" },
  inputBox: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, height: 48, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", marginTop: 8 },
  input: { flex: 1, fontSize: 14, color: "#ffffff" },
  body: { paddingHorizontal: 20, paddingTop: 20 },
  tryTitle: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  promptList: { gap: 8 },
  promptCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 16, borderWidth: 1, elevation: 1 },
  promptText: { flex: 1, fontSize: 14, fontWeight: "500" },
  arrowText: { fontSize: 18 },
  disclaimerBox: { marginTop: 20, borderRadius: 12, padding: 12, borderWidth: 1 },
  disclaimerText: { fontSize: 12, lineHeight: 18 },
  queryCard: { borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1 },
  queryLabel: { fontSize: 12, fontWeight: "500" },
  queryText: { fontSize: 14, fontWeight: "600", marginTop: 2 },
  analyzingCard: { borderRadius: 16, padding: 16, borderWidth: 1, elevation: 1 },
  analyzingHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  sparkleSmallBg: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  analyzingTitle: { fontSize: 14, fontWeight: "600" },
  stepList: { gap: 12 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepDot: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  pulseInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ffffff" },
  grayDot: { width: 6, height: 6, borderRadius: 3 },
  stepLabel: { fontSize: 12 },
  resultCard: { borderRadius: 20, padding: 20, borderWidth: 1, elevation: 2 },
  recHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  recIconBg: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  recLabel: { fontSize: 12 },
  recTitle: { fontSize: 20, fontWeight: "bold" },
  explanationText: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  metricBox: { flex: 1, minWidth: "45%", padding: 12, borderRadius: 12 },
  metricLabel: { fontSize: 10 },
  metricVal: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  riskBadge: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  riskText: { fontSize: 12, fontWeight: "500" },
  calcCard: { borderRadius: 16, padding: 16, borderWidth: 1, elevation: 1 },
  calcTitle: { fontSize: 12, fontWeight: "600", marginBottom: 12 },
  calcList: { gap: 8 },
  calcRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  calcCheck: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#d1fae5", alignItems: "center", justifyContent: "center" },
  calcText: { fontSize: 12 },
  planBtn: { borderRadius: 16, overflow: "hidden" },
  planGradient: { paddingVertical: 14, alignItems: "center" },
  planBtnText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  subBtn: { flex: 1, paddingVertical: 12, borderRadius: 16, alignItems: "center" },
  subBtnText: { fontSize: 14, fontWeight: "600" },
});
