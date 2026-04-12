
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const SubscriptionDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>SubscriptionDetail: {id}</Text>
            <Link href="../">
                Go Back
            </Link>
        </View>
    )
}

export default SubscriptionDetail;