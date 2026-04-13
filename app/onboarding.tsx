import { Link } from "expo-router"
import { Text, View } from "react-native"

const Onboarding = () => {
    return (
        <View>
            <Text className="mb-8 text-xl font-bold">Onboarding</Text>
            <Link href={"/(tabs)" as any}>
                <Text>Go to Home</Text>
            </Link>
        </View>

    )
}

export default Onboarding