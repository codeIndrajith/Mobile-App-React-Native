import { Subscription } from "@/type";
import { Text, View } from "react-native";

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
    return (
        <View className="w-full border border-border rounded-2xl p-4 bg-white mt-3">

            {/* Header */}
            <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-gray-900">
                    {subscription.name}
                </Text>

                <View className={`px-2 py-1 rounded-full ${subscription.status === "active"
                    ? "bg-green-100"
                    : "bg-red-100"
                    }`}>
                    <Text className={`text-xs font-medium ${subscription.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}>
                        {subscription.status}
                    </Text>
                </View>
            </View>

            {/* Amount */}
            <View className="mt-3">
                <Text className="text-2xl font-bold text-gray-900">
                    ${subscription.amount}
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                    {subscription.billingCycle}
                </Text>
            </View>

            {/* Divider */}
            <View className="my-3 h-px bg-gray-100" />

            {/* Footer Info */}
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-xs text-gray-400">Next billing</Text>
                    <Text className="text-sm text-gray-700">
                        {subscription.nextBilling}
                    </Text>
                </View>

                <View>
                    <Text className="text-xs text-gray-400">Category</Text>
                    <Text className="text-sm text-gray-700">
                        {subscription.category}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SubscriptionCard;