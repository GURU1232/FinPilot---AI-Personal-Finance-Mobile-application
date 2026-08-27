import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SearchIcon, FilterIcon, PlusIcon, CloseIcon } from "../components/ui/Icons";
import { transactions } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

const months = ["August 2024", "July 2024", "June 2024", "May 2024"];
const categories = ["All", "Food", "Shopping", "Income", "Travel", "Subscriptions", "Groceries", "Bill"];

export default function Transactions() {
  const { colors } = useTheme();
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <LinearGradient colors={colors.headerBg as [string, string]} style={styles.header}>
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
            <View style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <SearchIcon size={16} color={colors.textMuted} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search transactions..."
                placeholderTextColor={colors.textMuted}
                style={[styles.searchInput, { color: colors.textPrimary }]}
              />
            </View>
            <Pressable style={[styles.filterBtn, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <FilterIcon size={18} color={colors.accent} />
            </Pressable>
          </View>

          {/* Category Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {categories.map((c) => {
              const isSelected = c === selectedCategory;
              return (
                <Pressable
                  key={c}
                  onPress={() => setSelectedCategory(c)}
                  style={[
                    styles.catChip,
                    {
                      backgroundColor: isSelected ? colors.accent : colors.cardBg,
                      borderColor: isSelected ? colors.accent : colors.cardBorder,
                    },
                  ]}
                >
                  <Text style={{ color: isSelected ? "#ffffff" : colors.textMuted, fontSize: 12, fontWeight: "500" }}>
                    {c}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Transaction List */}
          <View style={styles.txList}>
            {filtered.map((t) => (
              <View key={t.id} style={[styles.txCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <View style={[styles.txIconBg, { backgroundColor: `${t.color}18` }]}>
                  <Text style={{ fontSize: 20 }}>{t.icon}</Text>
                </View>
                <View style={styles.txMeta}>
                  <Text style={[styles.txMerchant, { color: colors.textPrimary }]} numberOfLines={1}>{t.merchant}</Text>
                  <View style={styles.txTagRow}>
                    <View style={[styles.txBadge, { backgroundColor: `${t.color}18` }]}>
                      <Text style={{ fontSize: 10, fontWeight: "500", color: t.color }}>{t.category}</Text>
                    </View>
                    <Text style={[styles.txDate, { color: colors.textMuted }]}>{t.date}</Text>
                  </View>
                </View>
                <Text style={[styles.txAmount, { color: t.amount > 0 ? "#059669" : colors.textPrimary }]}>
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
          <View style={[styles.modalContent, { backgroundColor: colors.modalBg }]}>
            <View style={[styles.modalHandle, { backgroundColor: colors.cardBorder }]} />
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Add Transaction</Text>
              <Pressable onPress={() => setShowAdd(false)}>
                <CloseIcon size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.typeTabs}>
              {["Expense", "Income", "Transfer"].map((t) => (
                <Pressable
                  key={t}
                  style={[
                    styles.typeTab,
                    { backgroundColor: t === "Expense" ? colors.accent : colors.isDark ? "#2a2a36" : "#f1f5f9" },
                  ]}
                >
                  <Text style={{ color: t === "Expense" ? "#ffffff" : colors.textMuted, fontSize: 14, fontWeight: "500" }}>{t}</Text>
                </Pressable>
              ))}
            </View>

            <View style={[styles.amountDisplay, { backgroundColor: colors.isDark ? "#181820" : "#f8fafc" }]}>
              <Text style={[styles.currencySymbol, { color: colors.textMuted }]}>₹</Text>
              <Text style={[styles.amountBig, { color: colors.textPrimary }]}>0</Text>
            </View>

            {["Merchant / Payee", "Category", "Date", "Description"].map((label) => (
              <View key={label} style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textMuted }]}>{label}</Text>
                <TextInput
                  placeholder={label}
                  placeholderTextColor={colors.textMuted}
                  style={[styles.modalInput, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textPrimary }]}
                />
              </View>
            ))}

            <Pressable onPress={() => setShowAdd(false)} style={styles.saveBtn}>
              <LinearGradient colors={colors.headerBg as [string, string]} style={styles.saveGradient}>
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
  container: { flex: 1 },
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
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, height: 44, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 14 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  catScroll: { flexDirection: "row", marginBottom: 16 },
  catChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, marginRight: 8 },
  txList: { gap: 8 },
  txCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 16, borderWidth: 1, elevation: 1 },
  txIconBg: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  txMeta: { flex: 1 },
  txMerchant: { fontSize: 14, fontWeight: "600" },
  txTagRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  txBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  txDate: { fontSize: 10 },
  txAmount: { fontSize: 14, fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  typeTabs: { flexDirection: "row", gap: 8, marginBottom: 20 },
  typeTab: { flex: 1, paddingVertical: 8, borderRadius: 12, alignItems: "center" },
  amountDisplay: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, paddingVertical: 24, borderRadius: 16, marginBottom: 20 },
  currencySymbol: { fontSize: 24, fontWeight: "bold" },
  amountBig: { fontSize: 36, fontWeight: "bold" },
  inputGroup: { marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: "600", marginBottom: 4 },
  modalInput: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14 },
  saveBtn: { marginTop: 8, borderRadius: 16, overflow: "hidden" },
  saveGradient: { paddingVertical: 16, alignItems: "center" },
  saveText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
});
