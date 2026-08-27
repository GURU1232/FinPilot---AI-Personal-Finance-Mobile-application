import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HomeIcon, TransactionIcon, BudgetIcon, GoalsIcon, AIIcon } from "../ui/Icons";
import { useTheme } from "../../context/ThemeContext";

const tabs = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "transactions", label: "Transactions", Icon: TransactionIcon },
  { id: "budget", label: "Budget", Icon: BudgetIcon },
  { id: "goals", label: "Goals", Icon: GoalsIcon },
  { id: "ai", label: "FinPilot AI", Icon: AIIcon },
];

export default function BottomNav({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.navBg, borderTopColor: colors.navBorder }]}>
      <View style={styles.tabBar}>
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          const isAI = id === "ai";
          const iconColor = isAI ? "#ffffff" : isActive ? colors.accent : colors.textMuted;
          return (
            <Pressable
              key={id}
              onPress={() => onNavigate(id)}
              style={styles.tabButton}
            >
              {isAI ? (
                <LinearGradient
                  colors={
                    isActive
                      ? [colors.accent, "#6366f1", "#3b82f6"]
                      : ["#0f172a", "#1e3a5f"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.aiButton}
                >
                  <Icon size={20} active color="#ffffff" />
                </LinearGradient>
              ) : (
                <Icon size={22} active={isActive} color={iconColor} />
              )}
              <Text
                style={[
                  styles.tabLabel,
                  { color: isAI ? (isActive ? colors.accent : colors.textMuted) : isActive ? colors.accent : colors.textMuted },
                ]}
              >
                {label}
              </Text>
              {isActive && !isAI && <View style={[styles.activeDot, { backgroundColor: colors.accent }]} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    zIndex: 50,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  aiButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 2,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
});
