import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CrownIcon,
  PencilIcon,
  CameraIcon,
  CalendarIcon,
  MoonIcon,
  SunIcon,
  CloseIcon,
} from "../components/ui/Icons";
import { useUser } from "../context/UserContext";
import { useTheme, ThemeMode } from "../context/ThemeContext";

interface ProfileProps {
  onNavigateBack?: () => void;
  onNavigate?: (screen: string) => void;
  initialMode?: "main" | "edit";
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
];

export default function Profile({ onNavigateBack, onNavigate, initialMode ="main" }: ProfileProps) {
  const { user, updateUser } = useUser();
  const { themeMode, setThemeMode, colors } = useTheme();

  // Screen View States
  const [viewState, setViewState] = useState<"main" | "edit">(initialMode);

  // Modals
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(themeMode);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editMobile, setEditMobile] = useState(user.mobile);
  const [editAge, setEditAge] = useState(user.age);
  const [editDob, setEditDob] = useState(user.dob);
  const [editGender, setEditGender] = useState(user.gender);
  const [imageUrlInput, setImageUrlInput] = useState("");

  // Preference Toggles
  const [smartSavingsMode, setSmartSavingsMode] = useState(true);
  const [showRatings, setShowRatings] = useState(true);

  const handleSaveProfile = () => {
    updateUser({
      name: editName,
      email: editEmail,
      mobile: editMobile,
      age: editAge,
      dob: editDob,
      gender: editGender,
    });
    setViewState("main");
  };

  const handleSaveTheme = () => {
    setThemeMode(selectedTheme);
    setShowThemeModal(false);
  };

  const handleSelectAvatarImage = (url: string) => {
    updateUser({ profileImage: url });
    setShowImageModal(false);
  };

  const handleCustomImageUrl = () => {
    if (imageUrlInput.trim()) {
      updateUser({ profileImage: imageUrlInput.trim() });
      setImageUrlInput("");
      setShowImageModal(false);
    }
  };

  // --- EDIT PROFILE VIEW (Matching  Screenshot 2) ---
  if (viewState === "edit") {
    return (
      <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
        {/* Top Header */}
        <View style={[styles.subHeader, { backgroundColor: colors.background }]}>
          <TouchableOpacity
            onPress={()=>{
              if(initialMode === 'edit' && onNavigateBack){
                onNavigateBack() // flow 1 : navigate back to account setting
              }else{
                setViewState('main')
              }
            }}
            style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]}
          >
            <ChevronLeftIcon size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.subHeaderTitle, { color: colors.textPrimary }]}>Your Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.editBody}>
          {/* Avatar with Edit Badge */}
          <View style={styles.avatarEditContainer}>
            <TouchableOpacity
              onPress={() => setShowImageModal(true)}
              style={styles.avatarImageWrapper}
            >
              {user.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.avatarImgLarge} />
              ) : (
                <View style={styles.avatarPlaceholderLarge}>
                  <Text style={styles.avatarTextLarge}>{user.avatar}</Text>
                </View>
              )}
              <View style={styles.pencilBadge}>
                <PencilIcon size={14} color="#ffffff" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.avatarHint, { color: colors.textMuted }]}>
              Tap to change profile picture
            </Text>
          </View>

          {/* Outlined Form Fields (Matching  Floating Outlined Input Style) */}
          <View style={styles.formSection}>
            {/* Name Field */}
            <View style={[styles.outlinedBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <Text style={[styles.inputLabelBadge, { color: colors.textMuted, backgroundColor: colors.inputBg }]}>
                Name
              </Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                style={[styles.textInput, { color: colors.textPrimary }]}
                placeholderTextColor={colors.textMuted}
              />
            </View>

            {/* Mobile Field */}
            <View style={[styles.outlinedBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <Text style={[styles.inputLabelBadge, { color: colors.textMuted, backgroundColor: colors.inputBg }]}>
                Mobile
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={editMobile}
                  onChangeText={setEditMobile}
                  keyboardType="phone-pad"
                  style={[styles.textInput, { color: colors.textPrimary, flex: 1 }]}
                  placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity style={styles.actionTextBtn}>
                  <Text style={styles.changeActionText}>CHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Field */}
            <View style={[styles.outlinedBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <Text style={[styles.inputLabelBadge, { color: colors.textMuted, backgroundColor: colors.inputBg }]}>
                Email
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  style={[styles.textInput, { color: colors.textPrimary, flex: 1 }]}
                  placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity style={styles.actionTextBtn}>
                  <Text style={styles.changeActionText}>CHANGE</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Age / Date of Birth Field */}
            <View style={[styles.outlinedBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <Text style={[styles.inputLabelBadge, { color: colors.textMuted, backgroundColor: colors.inputBg }]}>
                Age / Date of birth
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={editDob ? `${editAge} yrs (${editDob})` : editAge}
                  onChangeText={(val) => setEditAge(val)}
                  style={[styles.textInput, { color: colors.textPrimary, flex: 1 }]}
                  placeholderTextColor={colors.textMuted}
                />
                <CalendarIcon size={20} color={colors.textMuted} />
              </View>
            </View>

            {/* Gender Field */}
            <View style={[styles.outlinedBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <Text style={[styles.inputLabelBadge, { color: colors.textMuted, backgroundColor: colors.inputBg }]}>
                Gender
              </Text>
              <TextInput
                value={editGender}
                onChangeText={setEditGender}
                style={[styles.textInput, { color: colors.textPrimary }]}
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Primary Update Profile Button */}
        <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
          <TouchableOpacity
            onPress={handleSaveProfile}
            style={[styles.primarySubmitBtn, { backgroundColor: colors.accent }]}
          >
            <Text style={styles.primarySubmitBtnText}>Update profile</Text>
          </TouchableOpacity>
        </View>

        {/* Image Selection Modal */}
        {renderImageModal()}
      </View>
    );
  }

  // --- MAIN PROFILE VIEW (Matching  Screenshots 1 & 3) ---
  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top Navigation Header */}
        <View style={[styles.mainHeader, { backgroundColor: colors.background }]}>
          {onNavigateBack && (
            <TouchableOpacity
              onPress={onNavigateBack}
              style={[styles.backBtn, { backgroundColor: colors.isDark ? "#1e293b" : "#e2e8f0" }]}
            >
              <ChevronLeftIcon size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
        </View>

        {/* -Style User Profile Header Card */}
        <View style={styles.profileCardWrapper}>
          <LinearGradient
            colors={colors.isDark ? ["#1c1c24", "#121217"] : ["#ffffff", "#f1f5f9"]}
            style={[styles.profileCard, { borderColor: colors.cardBorder }]}
          >
            {/* Avatar Circle with Gold Ring */}
            <TouchableOpacity onPress={() => setViewState("edit")} style={styles.avatarRingOuter}>
              {user.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.avatarImgMain} />
              ) : (
                <View style={styles.avatarInitialCircle}>
                  <Text style={styles.avatarInitialText}>{user.avatar}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Name + Email + Edit Profile Link */}
            <View style={styles.profileInfoTextCol}>
              <Text style={[styles.userNameTitle, { color: colors.textPrimary }]}>{user.name}</Text>
              <Text style={[styles.userEmailSub, { color: colors.textMuted }]} numberOfLines={1}>
                {user.email}
              </Text>
              <TouchableOpacity
                style={styles.editProfileBtnRow}
                onPress={() => setViewState("edit")}
              >
                <Text style={styles.editProfileText}>Edit profile</Text>
                <ChevronRightIcon size={14} color={colors.accent} />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setViewState("edit")} style={styles.editProfileBtnRow}>
                <Text style={styles.editProfileText}>Edit profile</Text>
                <ChevronRightIcon size={14} color={colors.accent} />
              </TouchableOpacity> */}
            </View>
          </LinearGradient>
        </View>

        {/* Quick Money / Stat Cards */}
        <View style={styles.quickCardsRow}>
          <View style={[styles.quickStatCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 20 }}>💰</Text>
            <View>
              <Text style={[styles.quickStatTitle, { color: colors.textMuted }]}>Expenses</Text>
              <Text style={[styles.quickStatValue, { color: colors.textPrimary }]}>₹20000</Text>
            </View>
          </View>
          <View style={[styles.quickStatCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={{ fontSize: 20 }}>💰</Text>
            <View>
              <Text style={[styles.quickStatTitle, { color: colors.textMuted }]}>Savings</Text>
              <Text style={[styles.quickStatValue, { color: colors.textPrimary }]}>₹10000</Text>
            </View>
          </View>
        </View>

        {/* SECTION 1: Your Preferences (Matching  Screenshot 1) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.pinkIndicatorBar, { backgroundColor: colors.accent }]} />
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Your preferences</Text>
          </View>

          <View style={[styles.menuGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            {/* Smart Savings Mode */}
            <View style={styles.menuRowItem}>
              <Text style={{ fontSize: 18 }}>❇️</Text>
              <Text style={[styles.menuRowLabel, { color: colors.textPrimary, flex: 1 }]}>
                Smart Savings Mode
              </Text>
              <Switch
                value={smartSavingsMode}
                onValueChange={setSmartSavingsMode}
                trackColor={{ false: "#475569", true: colors.accent }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

            {/* Show Personalised Ratings */}
            {/* <View style={styles.menuRowItem}>
              <Text style={{ fontSize: 18 }}>⭐</Text>
              <Text style={[styles.menuRowLabel, { color: colors.textPrimary, flex: 1 }]}>
                Show personalised ratings
              </Text>
              <Switch
                value={showRatings}
                onValueChange={setShowRatings}
                trackColor={{ false: "#475569", true: colors.accent }}
                thumbColor="#ffffff"
              />
            </View> */}

            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

            {/* Appearance (DARK / LIGHT MODE TOGGLE) */}
            <TouchableOpacity onPress={() => setShowThemeModal(true)} style={styles.menuRowItem}>
              <Text style={{ fontSize: 18 }}>🎨</Text>
              <Text style={[styles.menuRowLabel, { color: colors.textPrimary, flex: 1 }]}>
                Appearance
              </Text>
              <View style={styles.rightValueRow}>
                <Text style={[styles.rightValueText, { color: colors.textMuted }]}>
                  {themeMode === "dark" ? "Dark" : themeMode === "light" ? "Light" : "Device"}
                </Text>
                <ChevronRightIcon size={16} color={colors.textMuted} />
              </View>
            </TouchableOpacity>
          </View>
        </View>



        {/* SECTION 3: More Options (Matching  Screenshot 3) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.pinkIndicatorBar, { backgroundColor: colors.accent }]} />
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>More</Text>
          </View>

          <View style={[styles.menuGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            {[
              { icon: "👍", label: "Your feedback", screenId: "your_feedback" },
              { icon: "ℹ️", label: "About FinPilot", screenId: "about_finpilot" },
              { icon: "📝", label: "Send feedback", screenId: "send_feedback" },
              { icon: "♿", label: "Accessibility", screenId: "accessibility" },
              { icon: "⚙️", label: "Settings", screenId: "settings" },
            ].map((item, idx, arr) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity
                  style={styles.menuRowItem}
                  onPress={() => onNavigate && onNavigate(item.screenId)}
                >
                  <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                  <Text style={[styles.menuRowLabel, { color: colors.textPrimary, flex: 1 }]}>
                    {item.label}
                  </Text>
                  <ChevronRightIcon size={16} color={colors.textMuted} />
                </TouchableOpacity>
                {idx < arr.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
                )}
              </React.Fragment>
            ))}

            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

            {/* Logout */}
            <TouchableOpacity style={styles.menuRowItem}>
              <Text style={{ fontSize: 18 }}>🚪</Text>
              <Text style={[styles.menuRowLabel, { color: "#ef4444", flex: 1 }]}>Log out</Text>
              <ChevronRightIcon size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Brand Logo & Version */}
        <View style={styles.footerBranding}>
          <Text style={[styles.footerAppName, { color: colors.textMuted }]}>finpilot</Text>
          <Text style={[styles.footerVersion, { color: colors.textMuted }]}>v1.0.0 (3)</Text>
        </View>
      </ScrollView>

      {/* Theme Selection Modal / Bottom Sheet (Matching  Screenshot 1 Bottom Sheet) */}
      {renderThemeModal()}

      {/* Image Upload Modal */}
      {renderImageModal()}
    </View>
  );

  // --- APPEARANCE BOTTOM SHEET MODAL (Matching  Screenshot 1) ---
  function renderThemeModal() {
    return (
      <Modal
        visible={showThemeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowThemeModal(false)}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.bottomSheetContainer, { backgroundColor: colors.modalBg }]}
          >
            {/* Close Button Header */}
            <View style={styles.bottomSheetHeader}>
              <Text style={[styles.bottomSheetTitle, { color: colors.textPrimary }]}>Appearance</Text>
              <TouchableOpacity
                onPress={() => setShowThemeModal(false)}
                style={[styles.closeIconCircle, { backgroundColor: colors.isDark ? "#2a2a36" : "#e2e8f0" }]}
              >
                <CloseIcon size={16} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Radio Options List */}
            <View style={styles.radioOptionsList}>
              {[
                { id: "light" as ThemeMode, label: "Light theme", icon: <SunIcon size={18} color={colors.textMuted} /> },
                { id: "dark" as ThemeMode, label: "Dark theme", icon: <MoonIcon size={18} color={colors.textMuted} /> },
                { id: "system" as ThemeMode, label: "Use device theme", icon: <Text style={{ fontSize: 16 }}>📱</Text> },
              ].map((opt) => {
                const isSelected = selectedTheme === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    onPress={() => setSelectedTheme(opt.id)}
                    style={[styles.radioRow, { borderBottomColor: colors.cardBorder }]}
                  >
                    <View style={styles.radioLabelGroup}>
                      {opt.icon}
                      <Text style={[styles.radioLabelText, { color: colors.textPrimary }]}>{opt.label}</Text>
                    </View>
                    <View style={[styles.radioOuterCircle, { borderColor: isSelected ? colors.radioActive : colors.textMuted }]}>
                      {isSelected && (
                        <View style={[styles.radioInnerCircle, { backgroundColor: colors.radioActive }]} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Bottom Save Preference Button */}
            <TouchableOpacity
              onPress={handleSaveTheme}
              style={[styles.primarySubmitBtn, { backgroundColor: colors.accent, marginTop: 24 }]}
            >
              <Text style={styles.primarySubmitBtnText}>Save preference</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  // --- PROFILE IMAGE UPLOAD MODAL ---
  function renderImageModal() {
    return (
      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowImageModal(false)}
          style={styles.modalOverlay}
        >
          <View style={[styles.dialogContainer, { backgroundColor: colors.modalBg }]}>
            <Text style={[styles.dialogTitle, { color: colors.textPrimary }]}>Choose Profile Picture</Text>
            <Text style={[styles.dialogSub, { color: colors.textMuted }]}>
              Select a preset avatar or paste an image URL:
            </Text>

            {/* Preset Avatars Grid */}
            <View style={styles.presetGrid}>
              {PRESET_AVATARS.map((url, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleSelectAvatarImage(url)}
                  style={styles.presetItem}
                >
                  <Image source={{ uri: url }} style={styles.presetImg} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Image URL Input */}
            <View style={[styles.urlInputBox, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg }]}>
              <TextInput
                value={imageUrlInput}
                onChangeText={setImageUrlInput}
                placeholder="Or paste image URL (e.g. https://...)"
                placeholderTextColor={colors.textMuted}
                style={[styles.textInput, { color: colors.textPrimary }]}
              />
            </View>

            {/* Actions */}
            <View style={styles.dialogActions}>
              <TouchableOpacity
                onPress={() => setShowImageModal(false)}
                style={[styles.dialogBtn, { backgroundColor: colors.isDark ? "#2a2a36" : "#e2e8f0" }]}
              >
                <Text style={{ color: colors.textPrimary, fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCustomImageUrl}
                style={[styles.dialogBtn, { backgroundColor: colors.accent }]}
              >
                <Text style={{ color: "#ffffff", fontWeight: "600" }}>Apply Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  mainHeader: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10 },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  subHeaderTitle: { fontSize: 18, fontWeight: "bold" },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileCardWrapper: { paddingHorizontal: 20, marginBottom: 16 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    gap: 16,
  },
  avatarRingOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    borderColor: "#eab308",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  avatarImgMain: { width: "100%", height: "100%", borderRadius: 30 },
  avatarInitialCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "#d97706",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitialText: { fontSize: 24, fontWeight: "bold", color: "#ffffff" },
  profileInfoTextCol: { flex: 1 },
  userNameTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 2 },
  userEmailSub: { fontSize: 12, marginBottom: 8 },
  editProfileBtnRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  editProfileText: { fontSize: 13, fontWeight: "600", color: "#f43f5e" },

  goldMemberBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  // goldBannerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  // goldCrownBadge: {
  //   width: 28,
  //   height: 28,
  //   borderRadius: 14,
  //   backgroundColor: "rgba(234, 179, 8, 0.2)",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  goldMemberText: { fontSize: 14, fontWeight: "bold" },
  goldSavedPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(234, 179, 8, 0.18)",
    gap: 4,
  },
  goldSavedText: { fontSize: 12, fontWeight: "bold", color: "#eab308" },

  quickCardsRow: { flexDirection: "row", gap: 12, paddingHorizontal: 20, marginBottom: 20 },
  quickStatCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickStatTitle: { fontSize: 11, marginBottom: 2 },
  quickStatValue: { fontSize: 14, fontWeight: "bold" },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 20 },
  sectionHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  pinkIndicatorBar: { width: 3, height: 16, borderRadius: 2 },
  sectionHeading: { fontSize: 16, fontWeight: "bold" },
  menuGroupCard: { borderRadius: 20, borderWidth: 1, overflow: "hidden" },
  menuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  menuRowLabel: { fontSize: 14, fontWeight: "500" },
  rightValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  rightValueText: { fontSize: 13 },
  divider: { height: 1, marginHorizontal: 16 },

  footerBranding: { alignItems: "center", marginTop: 10, paddingBottom: 20 },
  footerAppName: { fontSize: 18, fontWeight: "bold", letterSpacing: 1 },
  footerVersion: { fontSize: 11, marginTop: 2 },

  // Edit Profile Styles
  editBody: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  avatarEditContainer: { alignItems: "center", marginBottom: 28 },
  avatarImageWrapper: { width: 96, height: 96, borderRadius: 48, position: "relative" },
  avatarImgLarge: { width: 96, height: 96, borderRadius: 48 },
  avatarPlaceholderLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTextLarge: { fontSize: 36, fontWeight: "bold", color: "#ffffff" },
  pencilBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f43f5e",
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarHint: { fontSize: 12, marginTop: 8 },

  formSection: { gap: 18 },
  outlinedBox: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  inputLabelBadge: {
    position: "absolute",
    top: -10,
    left: 12,
    paddingHorizontal: 6,
    fontSize: 11,
    fontWeight: "500",
  },
  inputRow: { flexDirection: "row", alignItems: "center" },
  textInput: { fontSize: 15, paddingVertical: 4, fontWeight: "500" },
  actionTextBtn: { paddingLeft: 8 },
  changeActionText: { fontSize: 12, fontWeight: "bold", color: "#f43f5e" },

  bottomBar: { padding: 16, borderTopWidth: 1 },
  primarySubmitBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primarySubmitBtnText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },

  // Modals & Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bottomSheetTitle: { fontSize: 20, fontWeight: "bold" },
  closeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOptionsList: { gap: 4 },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  radioLabelGroup: { flexDirection: "row", alignItems: "center", gap: 12 },
  radioLabelText: { fontSize: 15, fontWeight: "500" },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: { width: 12, height: 12, borderRadius: 6 },

  dialogContainer: { marginHorizontal: 20, borderRadius: 20, padding: 20, marginVertical: "auto" },
  dialogTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  dialogSub: { fontSize: 12, marginBottom: 16 },
  presetGrid: { flexDirection: "row", gap: 12, marginBottom: 16, justifyContent: "center" },
  presetItem: { width: 56, height: 56, borderRadius: 28, overflow: "hidden" },
  presetImg: { width: "100%", height: "100%" },
  urlInputBox: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 16 },
  dialogActions: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
  dialogBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
});
