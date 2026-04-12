import { Link } from "expo-router"
import { Text, View } from "react-native"

const signup = () => {
    return (
        <View>
            <Text>Sign Up</Text>
            <Link href="/(auth)/sign-in">
                <Text>Sign In</Text>
            </Link>
        </View>
    )
}

export default signup