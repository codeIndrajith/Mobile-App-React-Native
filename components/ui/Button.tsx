import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export const Button = ({ title, onPress, variant = "primary", loading = false }: { title: string, onPress: () => void, variant?: "primary" | "secondary", loading?: boolean }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={`${variant === "primary" ? "bg-foreground" : "bg-surface border border-border"} h-14 w-full flex-row items-center justify-center rounded-button px-6 mb-3`}
        >
            {loading ? (
                <ActivityIndicator color={variant === "primary" ? "#000" : "#fff"} />
            ) : (
                <Text className={`${variant === "primary" ? "text-background" : "text-text-primary"} font-bold text-base`}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};