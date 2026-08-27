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
import SendFeedback from "./screens/SendFeedback";
import Settings from "./screens/Settings";
import AccountSettings from "./screens/AccountSettings";
import NotificationPreferences from "./screens/NotificationPreferences";
import AppPermissions from "./screens/AppPermissions";
import YourFeedback from "./screens/YourFeedback";
import AboutFinPilot from "./screens/AboutFinPilot";
import Accessibility from "./screens/Accessibility";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

const MAIN_SCREENS = ["home", "transactions", "budget", "goals", "ai"];

function MainAppContent() {
  const [onboarded, setOnboarded] = useState(false);
  const [screen, setScreen] = useState("home");
  const { colors } = useTheme();

  const activeTab = MAIN_SCREENS.includes(screen) ? screen : "home";

  const handleNavigate = (id: string) => {
    setScreen(id);
  };

  if (!onboarded) {
    return (
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: colors.background }]}>
        <ExpoStatusBar style={colors.isDark ? "light" : "dark"} />
        <Onboarding onComplete={() => setOnboarded(true)} />
      </SafeAreaView>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "transactions":
        return <Transactions />;
      case "budget":
        return <Budget />;
      case "goals":
        return <Goals />;
      case "ai":
        return <AIAssistant />;
      case "debt":
        return <Debt />;
      case "reports":
        return <Reports />;
      case "health":
        return <Health />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile onNavigateBack={() => handleNavigate("home")} onNavigate={handleNavigate} />;
      case "send_feedback":
        return <SendFeedback onBack={() => handleNavigate("profile")} onNavigateToAI={() => handleNavigate("ai")} />;
      case "settings":
        return <Settings onBack={() => handleNavigate("profile")} onNavigate={handleNavigate} />;
      case "account_settings":
        return <AccountSettings onBack={() => handleNavigate("settings")} 
        onNavigateToProfileEdit={() => handleNavigate("edit_profile")}
        />;
      case "edit_profile":
        return(<Profile onNavigateBack={()=>handleNavigate("account_settings")} 
        onNavigate={handleNavigate} initialMode="edit" />);
      case "notification_settings":
        return <NotificationPreferences onBack={() => handleNavigate("settings")} />;
      case "app_permissions":
        return <AppPermissions onBack={() => handleNavigate("settings")} />;
      case "your_feedback":
        return <YourFeedback onBack={() => handleNavigate("profile")} onNavigateToSendFeedback={() => handleNavigate("send_feedback")} />;
      case "about_finpilot":
        return <AboutFinPilot onBack={() => handleNavigate("profile")} />;
      case "accessibility":
        return <Accessibility onBack={() => handleNavigate("profile")} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: colors.isDark ? "#0f172a" : colors.background }]}>
      <ExpoStatusBar style={colors.isDark ? "light" : "dark"} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.screenContainer}>{renderScreen()}</View>
        <BottomNav active={activeTab} onNavigate={handleNavigate} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainAppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  screenContainer: {
    flex: 1,
  },
});
