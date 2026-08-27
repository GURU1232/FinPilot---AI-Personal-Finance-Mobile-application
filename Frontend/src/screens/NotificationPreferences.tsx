import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon } from "../components/ui/Icons";

interface NotificationPreferencesProps {
  onBack: () => void;
}

export default function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  const { colors } = useTheme();

  // Switch states
  const [pushMaster, setPushMaster] = useState(false);
  const [enableAll, setEnableAll] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState(true);

  const [promoEmail, setPromoEmail] = useState(true);
  const [promoPush, setPromoPush] = useState(true);
  const [promoWhatsApp, setPromoWhatsApp] = useState(true);

  const [socialEmail, setSocialEmail] = useState(true);
  const [socialPush, setSocialPush] = useState(true);

  const [orderEmail, setOrderEmail] = useState(false);
  const [orderPush, setOrderPush] = useState(true);
  const [orderWhatsApp, setOrderWhatsApp] = useState(true);

  const [importantEmail, setImportantEmail] = useState(false);

  const handleSave = () => {
    Alert.alert("Preferences Saved", "Your notification settings have been updated.", [
      { text: "OK", onPress: onBack },
    ]);
  };

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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Notification Preferences
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Push Master Status Banner */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
                Push Notifications
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                To enable notifications, go to <Text style={{ color: colors.accent, fontWeight: "600" }}>settings</Text>
              </Text>
            </View>
            <View style={[styles.offBadge, { backgroundColor: colors.isDark ? "#334155" : "#e2e8f0" }]}>
              <Text style={[styles.offBadgeText, { color: colors.textMuted }]}>OFF</Text>
            </View>
          </View>
        </View>

        {/* Enable All */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Enable all</Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Activate all notifications
              </Text>
            </View>
            <Switch
              value={enableAll}
              onValueChange={setEnableAll}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Newsletters */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Newsletters</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Receive newsletter to stay up-to-date with what's brewing in personal finance
          </Text>
          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>✉️</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Email</Text>
            <Switch
              value={newsletterEmail}
              onValueChange={setNewsletterEmail}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Promos and offers */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Promos and offers
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Receive updates about coupons, promotions and money-saving offers
          </Text>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>✉️</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Email</Text>
            <Switch
              value={promoEmail}
              onValueChange={setPromoEmail}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Push</Text>
            <Switch
              value={promoPush}
              onValueChange={setPromoPush}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>💬</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>WhatsApp</Text>
            <Switch
              value={promoWhatsApp}
              onValueChange={setPromoWhatsApp}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Social notifications */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Social notifications
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Get notified when someone follows your profile, or when you get likes and comments
          </Text>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>✉️</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Email</Text>
            <Switch
              value={socialEmail}
              onValueChange={setSocialEmail}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Push</Text>
            <Switch
              value={socialPush}
              onValueChange={setSocialPush}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Transactions and budget alerts */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Transactions and purchases
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Receive updates related to your transactions, budget limits, and bill reminders
          </Text>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>✉️</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Email</Text>
            <Switch
              value={orderEmail}
              onValueChange={setOrderEmail}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Push</Text>
            <Switch
              value={orderPush}
              onValueChange={setOrderPush}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>💬</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>WhatsApp</Text>
            <Switch
              value={orderWhatsApp}
              onValueChange={setOrderWhatsApp}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Important updates */}
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Important updates
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Receive important updates related to your account
          </Text>

          <View style={[styles.toggleRow, { borderTopColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 16 }}>✉️</Text>
            <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Email</Text>
            <Switch
              value={importantEmail}
              onValueChange={setImportantEmail}
              trackColor={{ false: "#64748b", true: colors.accent }}
              thumbColor="#ffffff"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.accent }]} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save changes</Text>
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
    gap: 12,
  },
  sectionBox: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  offBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  offBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    gap: 12,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
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
  saveBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
});
