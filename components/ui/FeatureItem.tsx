import { Text, View } from "react-native";

export const FeatureItem = ({ text }: { text: string }) => (
    <View className="flex-row items-center mb-4 gap-3">
        <View className="size-6 items-center justify-center rounded-full bg-accent/20">
            <Text className="text-accent font-bold text-base">✓</Text>
        </View>
        <Text className="text-text-secondary text-base font-medium">{text}</Text>
    </View>
);