import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon } from "../components/ui/Icons";

interface AccessibilityProps {
  onBack: () => void;
}

export default function Accessibility({ onBack }: AccessibilityProps) {
  const { colors } = useTheme();

  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(true);

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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Accessibility</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {[
            {
              id: "contrast",
              icon: "👁️",
              title: "High Contrast Mode",
              desc: "Increases color contrast for text and icon elements",
              value: highContrast,
              setter: setHighContrast,
            },
            {
              id: "text",
              icon: "🔤",
              title: "Dynamic Large Text",
              desc: "Scales text size according to system accessibility preferences",
              value: largeText,
              setter: setLargeText,
            },
            {
              id: "motion",
              icon: "⚡",
              title: "Reduce Motion",
              desc: "Minimizes UI animations and smooth transitions",
              value: reduceMotion,
              setter: setReduceMotion,
            },
            {
              id: "reader",
              icon: "🗣️",
              title: "Screen Reader Support",
              desc: "Provides descriptive ARIA accessibility labels for VoiceOver/TalkBack",
              value: screenReader,
              setter: setScreenReader,
            },
          ].map((item, idx, arr) => (
            <React.Fragment key={item.id}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
                  <Text style={[styles.desc, { color: colors.textMuted }]}>{item.desc}</Text>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.setter}
                  trackColor={{ false: "#64748b", true: colors.accent }}
                  thumbColor="#ffffff"
                />
              </View>
              {idx < arr.length - 1 && <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
