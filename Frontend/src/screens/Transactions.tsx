import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SearchIcon, FilterIcon, PlusIcon, CloseIcon } from "../components/ui/Icons";
import { transactions } from "../data/mockData";

const months = ["August 2024", "July 2024", "June 2024", "May 2024"];
const categories = ["All", "Food", "Shopping", "Income", "Travel", "Subscriptions", "Groceries", "Bill"];

export default function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = transactions.filter((t) => {
    const catMatch = selectedCategory === "All" || t.category === selectedCategory;
    const searchMatch = t.merchant.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const totalIncome = filtered.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const totalExpense = filtered.filter(t => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.header}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Transactions</Text>
            <Pressable onPress={() => setShowAdd(true)} style={styles.addBtn}>
              <PlusIcon size={18} color="#ffffff" />
            </Pressable>
          </View>

          {/* Month Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
            {months.map((m, i) => (
              <Pressable
                key={i}
                onPress={() => setSelectedMonth(i)}
                style={[
                  styles.monthPill,
                  { backgroundColor: i === selectedMonth ? "#ffffff" : "rgba(255,255,255,0.1)" },
                ]}
              >
                <Text style={[styles.monthText, { color: i === selectedMonth ? "#0f172a" : "rgba(255,255,255,0.7)" }]}>
                  {m}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Summary */}
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, { backgroundColor: "rgba(16,185,129,0.15)" }]}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryVal, { color: "#34d399" }]}>+₹{totalIncome.toLocaleString("en-IN")}</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: "rgba(239,68,68,0.15)" }]}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryVal, { color: "#f87171" }]}>-₹{totalExpense.toLocaleString("en-IN")}</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: "rgba(96,165,250,0.15)" }]}>
              <Text style={styles.summaryLabel}>Net</Text>
              <Text style={[styles.summaryVal, { color: "#60a5fa" }]}>₹{(totalIncome - totalExpense).toLocaleString("en-IN")}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Search + Filter */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <SearchIcon size={16} color="#94a3b8" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search transactions..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
            </View>
            <Pressable style={styles.filterBtn}>
              <FilterIcon size={18} color="#6366f1" />
            </Pressable>
          </View>

          {/* Category Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {categories.map((c) => (
              <Pressable
                key={c}
                onPress={() => setSelectedCategory(c)}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: c === selectedCategory ? "#0f172a" : "#ffffff",
                    borderColor: c === selectedCategory ? "#0f172a" : "#e2e8f0",
                  },
                ]}
              >
                <Text style={{ color: c === selectedCategory ? "#ffffff" : "#64748b", fontSize: 12, fontWeight: "500" }}>
                  {c}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Transaction List */}
          <View style={styles.txList}>
            {filtered.map((t) => (
              <View key={t.id} style={styles.txCard}>
                <View style={[styles.txIconBg, { backgroundColor: `${t.color}15` }]}>
                  <Text style={{ fontSize: 20 }}>{t.icon}</Text>
                </View>
                <View style={styles.txMeta}>
                  <Text style={styles.txMerchant} numberOfLines={1}>{t.merchant}</Text>
                  <View style={styles.txTagRow}>
                    <View style={[styles.txBadge, { backgroundColor: `${t.color}15` }]}>
                      <Text style={{ fontSize: 10, fontWeight: "500", color: t.color }}>{t.category}</Text>
                    </View>
                    <Text style={styles.txDate}>{t.date}</Text>
                  </View>
                </View>
                <Text style={[styles.txAmount, { color: t.amount > 0 ? "#059669" : "#0f172a" }]}>
                  {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Transaction Sheet Modal */}
      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <Pressable onPress={() => setShowAdd(false)}>
                <CloseIcon size={20} color="#94a3b8" />
              </Pressable>
            </View>

            <View style={styles.typeTabs}>
              {["Expense", "Income", "Transfer"].map((t) => (
                <Pressable
                  key={t}
                  style={[
                    styles.typeTab,
                    { backgroundColor: t === "Expense" ? "#0f172a" : "#f1f5f9" },
                  ]}
                >
                  <Text style={{ color: t === "Expense" ? "#ffffff" : "#64748b", fontSize: 14, fontWeight: "500" }}>{t}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.amountDisplay}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text style={styles.amountBig}>0</Text>
            </View>

            {["Merchant / Payee", "Category", "Date", "Description"].map((label) => (
              <View key={label} style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                  placeholder={label}
                  placeholderTextColor="#94a3b8"
                  style={styles.modalInput}
                />
              </View>
            ))}

            <Pressable onPress={() => setShowAdd(false)} style={styles.saveBtn}>
              <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.saveGradient}>
                <Text style={styles.saveText}>Save Transaction</Text>
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
  header: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  addBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  monthScroll: { flexDirection: "row", marginBottom: 16 },
  monthPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  monthText: { fontSize: 12, fontWeight: "500" },
  summaryRow: { flexDirection: "row", gap: 12 },
  summaryCard: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12 },
  summaryLabel: { fontSize: 10, color: "rgba(255,255,255,0.6)" },
  summaryVal: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  body: { paddingHorizontal: 20, paddingTop: 16 },
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, height: 44, backgroundColor: "#ffffff", borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0" },
  searchInput: { flex: 1, fontSize: 14, color: "#0f172a" },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e2e8f0" },
  catScroll: { flexDirection: "row", marginBottom: 16 },
  catChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, marginRight: 8 },
  txList: { gap: 8 },
  txCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, backgroundColor: "#ffffff", borderRadius: 16, elevation: 1 },
  txIconBg: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  txMeta: { flex: 1 },
  txMerchant: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  txTagRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  txBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  txDate: { fontSize: 10, color: "#94a3b8" },
  txAmount: { fontSize: 14, fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#ffffff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#e2e8f0", alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  typeTabs: { flexDirection: "row", gap: 8, marginBottom: 20 },
  typeTab: { flex: 1, paddingVertical: 8, borderRadius: 12, alignItems: "center" },
  amountDisplay: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#f8fafc", paddingVertical: 24, borderRadius: 16, marginBottom: 20 },
  currencySymbol: { fontSize: 24, fontWeight: "bold", color: "#94a3b8" },
  amountBig: { fontSize: 36, fontWeight: "bold", color: "#0f172a" },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: "600", color: "#64748b", marginBottom: 4 },
  modalInput: { borderWidth: 1.5, borderColor: "#e2e8f0", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: "#0f172a" },
  saveBtn: { marginTop: 8, borderRadius: 16, overflow: "hidden" },
  saveGradient: { paddingVertical: 16, alignItems: "center" },
  saveText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
});
