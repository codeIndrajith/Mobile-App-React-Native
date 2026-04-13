import { UpcomingSubscription } from "@/type";
import { Image, Text, View } from "react-native";

const UpcomingSubscriptionCard = ({
    subscription,
}: {
    subscription: UpcomingSubscription;
}) => {
    return (
        <View className="border border-border rounded-2xl p-3 w-[150px] mt-3 mr-3">
            <View className="flex-row items-center gap-2">
                <View className="w-14 h-14 rounded-full bg-white items-center justify-center">
                    <Image
                        source={subscription.icon}
                        className="w-14 h-14 border border-white rounded-full p-6"
                        resizeMode="contain"
                    />
                </View>
                <View className="flex-col items-start justify-center">
                    <Text className="text-sm font-semibold text-gray-600">
                        {subscription.amount}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-0.5">
                        {subscription.date}
                    </Text>
                </View>
            </View>

            <View className="mt-2">
                <Text className="text-xl font-semibold">
                    {subscription.name}
                </Text>
            </View>
        </View>
    );
};

export default UpcomingSubscriptionCard;