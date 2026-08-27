import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon } from "../components/ui/Icons";

interface YourFeedbackProps {
  onBack: () => void;
  onNavigateToSendFeedback: () => void;
}

export default function YourFeedback({ onBack, onNavigateToSendFeedback }: YourFeedbackProps) {
  const { colors } = useTheme();

  const feedbackHistory = [
    {
      id: "1",
      date: "Aug 20, 2026",
      text: "Love the AI Assistant budget breakdown feature! Super helpful.",
      status: "Reviewed",
      statusColor: "#10b981",
    },
    {
      id: "2",
      date: "Jul 14, 2026",
      text: "Could you add automatic SMS transaction parsing for Indian bank accounts?",
      status: "In Progress",
      statusColor: "#60a5fa",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]}
          onPress={onBack}
        >
          <ChevronLeftIcon size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Your Feedback</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {feedbackHistory.length > 0 ? (
          <View style={styles.historyList}>
            {feedbackHistory.map((item) => (
              <View
                key={item.id}
                style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.dateText, { color: colors.textMuted }]}>{item.date}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                </View>
                <Text style={[styles.feedbackText, { color: colors.textPrimary }]}>{item.text}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>💬</Text>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No feedback submitted yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
              We value your thoughts! Share what you think about FinPilot.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity style={[styles.newBtn, { backgroundColor: colors.accent }]} onPress={onNavigateToSendFeedback}>
          <Text style={styles.newBtnText}>+ Send New Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  historyList: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  newBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  newBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
});
