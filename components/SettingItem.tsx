import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";


const SettingItem = ({
    icon,
    label,
    onPress,
    color = "#1a1a1a"
}: {
    icon: keyof typeof Ionicons.glyphMap,
    label: string,
    onPress: () => void,
    color?: string
}) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-row items-center justify-between py-4 border-b border-gray-100"
    >
        <View className="flex-row items-center">
            <Ionicons name={icon} size={22} color={color} />
            <Text className="ml-4 text-[16px] font-medium" style={{ color }}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
    </TouchableOpacity>
);

export default SettingItem