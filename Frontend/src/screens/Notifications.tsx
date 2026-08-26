import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { notifications } from "../data/mockData";

export default function Notifications() {
  const [list, setList] = useState(notifications);

  const markAllRead = () => {
    setList(list.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setList(list.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>{list.filter(n => !n.read).length} unread alerts</Text>
          </View>
          <Pressable onPress={markAllRead} style={styles.markBtn}>
            <Text style={styles.markText}>Mark all read</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {list.map((n) => (
          <Pressable
            key={n.id}
            onPress={() => toggleRead(n.id)}
            style={[
              styles.notifCard,
              { backgroundColor: n.read ? "#ffffff" : "#f5f3ff", borderColor: n.read ? "#f1f5f9" : "#ede9fe" },
            ]}
          >
            <View style={[styles.iconBg, { backgroundColor: `${n.color}15` }]}>
              <Text style={{ fontSize: 20 }}>{n.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.cardTopRow}>
                <Text style={styles.notifTitle}>{n.title}</Text>
                {!n.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notifMessage}>{n.message}</Text>
              <Text style={styles.timeText}>{n.time}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  subtitle: { fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 },
  markBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)" },
  markText: { fontSize: 12, fontWeight: "500", color: "#ffffff" },
  body: { paddingHorizontal: 20, paddingTop: 20, gap: 10 },
  notifCard: { flexDirection: "row", gap: 12, padding: 14, borderRadius: 16, borderWidth: 1, elevation: 1 },
  iconBg: { width: 40, height: 40, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  notifTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#6366f1" },
  notifMessage: { fontSize: 12, lineHeight: 18, color: "#64748b", marginTop: 4 },
  timeText: { fontSize: 10, color: "#94a3b8", marginTop: 6 },
});
