import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const slides = [
  {
    emoji: "💰",
    title: "Track Every Rupee",
    subtitle: "Know exactly where your money goes — automatically categorized, beautifully visualized.",
    colors: ["#0f172a", "#1e3a5f"] as [string, string],
    accent: "#60a5fa",
  },
  {
    emoji: "📊",
    title: "Understand Your Spending",
    subtitle: "Get smart insights into your habits. See trends before they become problems.",
    colors: ["#059669", "#065f46"] as [string, string],
    accent: "#34d399",
  },
  {
    emoji: "🎯",
    title: "Build Meaningful Goals",
    subtitle: "Emergency fund, dream bike, Goa trip — set goals and watch them grow.",
    colors: ["#7c3aed", "#4c1d95"] as [string, string],
    accent: "#a78bfa",
  },
  {
    emoji: "🤖",
    title: "Your AI Finance Pilot",
    subtitle: "Ask anything. Get personalized financial plans built around your life.",
    colors: ["#dc2626", "#7c2d12"] as [string, string],
    accent: "#fca5a5",
  },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  if (showAuth) {
    return <AuthScreen authMode={authMode} setAuthMode={setAuthMode} onComplete={onComplete} />;
  }

  const slide = slides[step];

  return (
    <LinearGradient colors={slide.colors} style={styles.container}>
      <View style={styles.slideContent}>
        <View style={styles.emojiCard}>
          <Text style={styles.emojiText}>{slide.emoji}</Text>
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        <View style={styles.dotRow}>
          {slides.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => setStep(i)}
              style={[
                styles.dot,
                {
                  width: i === step ? 24 : 8,
                  backgroundColor: i === step ? "#ffffff" : "rgba(255,255,255,0.3)",
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {step < slides.length - 1 ? (
          <>
            <Pressable
              onPress={() => setStep(step + 1)}
              style={[styles.primaryButton, { backgroundColor: slide.accent }]}
            >
              <Text style={[styles.primaryButtonText, { color: "#0f172a" }]}>Continue</Text>
            </Pressable>
            <Pressable onPress={() => setStep(slides.length - 1)} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Skip</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              onPress={() => { setAuthMode("signup"); setShowAuth(true); }}
              style={[styles.primaryButton, { backgroundColor: "#ffffff" }]}
            >
              <Text style={[styles.primaryButtonText, { color: "#0f172a" }]}>Get Started Free</Text>
            </Pressable>
            <Pressable
              onPress={() => { setAuthMode("login"); setShowAuth(true); }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>
                Already have an account? <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Sign in</Text>
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

function AuthScreen({
  authMode,
  setAuthMode,
  onComplete,
}: {
  authMode: "login" | "signup";
  setAuthMode: (m: "login" | "signup") => void;
  onComplete: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <ScrollView style={styles.authContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.authHeader}>
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <Text style={{ fontSize: 18 }}>✈️</Text>
          </View>
          <Text style={styles.brandText}>FinPilot</Text>
        </View>
        <Text style={styles.authTitle}>
          {authMode === "signup" ? "Create your account" : "Welcome back"}
        </Text>
        <Text style={styles.authSubtitle}>
          {authMode === "signup" ? "Start your financial journey today" : "Continue your financial journey"}
        </Text>
      </LinearGradient>

      <View style={styles.authForm}>
        {authMode === "signup" && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Arjun "
              placeholderTextColor="#94a3b8"
              style={styles.input}
            />
          </View>
        )}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="arjun@example.com"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            style={styles.input}
          />
          {authMode === "login" && (
            <Pressable style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          )}
        </View>

        <Pressable onPress={onComplete} style={styles.submitBtn}>
          <LinearGradient colors={["#0f172a", "#1e3a5f"]} style={styles.submitGradient}>
            <Text style={styles.submitText}>
              {authMode === "signup" ? "Create Account" : "Sign In"}
            </Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <Pressable style={styles.googleBtn}>
          <Text style={styles.googleBtnText}>🇬  Continue with Google</Text>
        </Pressable>

        <Pressable
          onPress={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
          style={styles.switchAuthBtn}
        >
          <Text style={styles.switchAuthText}>
            {authMode === "signup" ? "Already have an account? " : "Don't have an account? "}
            <Text style={{ color: "#6366f1", fontWeight: "bold" }}>
              {authMode === "signup" ? "Sign in" : "Create one"}
            </Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  slideContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emojiCard: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  emojiText: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255,255,255,0.72)",
    textAlign: "center",
  },
  dotRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 48,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  authContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  authHeader: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  authSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  authForm: {
    padding: 24,
    gap: 16,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: "#0f172a",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotText: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "500",
  },
  submitBtn: {
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    fontSize: 12,
    color: "#94a3b8",
    marginHorizontal: 12,
  },
  googleBtn: {
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  switchAuthBtn: {
    alignItems: "center",
    marginTop: 8,
  },
  switchAuthText: {
    fontSize: 14,
    color: "#94a3b8",
  },
});
