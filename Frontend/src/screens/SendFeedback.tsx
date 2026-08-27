import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon, SparkleIcon } from "../components/ui/Icons";

interface SendFeedbackProps {
  onBack: () => void;
  onNavigateToAI?: () => void;
}

export default function SendFeedback({ onBack, onNavigateToAI }: SendFeedbackProps) {
  const { colors } = useTheme();
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
    Alert.alert(
      "Feedback Submitted",
      "Thank you for helping us improve FinPilot!",
      [{ text: "OK", onPress: onBack }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]} onPress={onBack}>
          <ChevronLeftIcon size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Title Section */}
        <Text style={[styles.title, { color: colors.textPrimary }]}>Send Feedback</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Tell us what you love about the app, or what we could be doing better.
        </Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.textPrimary,
                borderColor: colors.cardBorder,
              },
            ]}
            placeholder="Enter feedback"
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>

        {/* Need Help Card */}
        <View style={[styles.helpCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.starIconContainer}>
            <Text style={{ fontSize: 24 }}>⭐</Text>
          </View>
          <View style={styles.helpTextContainer}>
            <Text style={[styles.helpTitle, { color: colors.textPrimary }]}>
              Need help with your transactions?
            </Text>
            <Text style={[styles.helpSubtitle, { color: colors.textMuted }]}>
              Get instant help from our AI support team.
            </Text>
            <TouchableOpacity onPress={onNavigateToAI}>
              <Text style={[styles.helpLink, { color: colors.accent }]}>Go to AI support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            {
              backgroundColor: feedback.trim() ? colors.accent : colors.isDark ? "#334155" : "#cbd5e1",
            },
          ]}
          disabled={!feedback.trim()}
          onPress={handleSubmit}
        >
          <Text style={[styles.submitBtnText, { color: feedback.trim() ? "#ffffff" : colors.textMuted }]}>
            Submit feedback
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 28,
  },
  input: {
    fontSize: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },
  helpCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 14,
  },
  starIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  helpTextContainer: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  helpLink: {
    fontSize: 13,
    fontWeight: "600",
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
  submitBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
