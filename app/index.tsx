import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding">
        <Text className="text-xl font-bold text-success mt-4">
          Go to Onboarding
        </Text>
      </Link>

      <Link href="/(auth)/sign-in">
        <Text className="text-xl font-bold text-success mt-4">
          Go to sign in
        </Text>
      </Link>

      <Link href="/(auth)/sign-up">
        <Text className="text-xl font-bold text-success mt-4">
          Create Account
        </Text>
      </Link>

      <Link href={{
        pathname: "/subscriptions/[id]",
        params: {
          id: "spotify"
        }
      }}>
        <Text className="text-xl font-bold text-success mt-4">
          Spotify subscription
        </Text>
      </Link>

      <Link href={{
        pathname: "/subscriptions/[id]",
        params: {
          id: "claude-max"
        }
      }}>
        <Text className="text-xl font-bold text-success mt-4">
          Claude Max Subscription
        </Text>
      </Link>
    </View>
  );
}
