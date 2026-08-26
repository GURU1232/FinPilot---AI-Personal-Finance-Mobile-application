import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import BottomNav from "./components/layout/BottomNav";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Transactions from "./screens/Transactions";
import Budget from "./screens/Budget";
import Goals from "./screens/Goals";
import AIAssistant from "./screens/AIAssistant";
import Debt from "./screens/Debt";
import Reports from "./screens/Reports";
import Health from "./screens/Health";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";

const MAIN_SCREENS = ["home", "transactions", "budget", "goals", "ai"];

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [screen, setScreen] = useState("home");

  const activeTab = MAIN_SCREENS.includes(screen) ? screen : "home";

  const handleNavigate = (id: string) => {
    setScreen(id);
  };

  if (!onboarded) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ExpoStatusBar style="light" />
        <Onboarding onComplete={() => setOnboarded(true)} />
      </SafeAreaView>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "home": return <Home onNavigate={handleNavigate} />;
      case "transactions": return <Transactions />;
      case "budget": return <Budget />;
      case "goals": return <Goals />;
      case "ai": return <AIAssistant />;
      case "debt": return <Debt />;
      case "reports": return <Reports />;
      case "health": return <Health />;
      case "notifications": return <Notifications />;
      case "profile": return <Profile />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  const isDarkHeader = ["home", "ai", "debt", "health"].includes(screen);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ExpoStatusBar style={isDarkHeader ? "light" : "dark"} />
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
        <BottomNav active={activeTab} onNavigate={handleNavigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  screenContainer: {
    flex: 1,
  },
});
