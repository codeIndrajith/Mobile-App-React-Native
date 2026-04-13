import { Link } from "expo-router"
import { Text, View } from "react-native"

const SignIn = () => {
    return (
        <View>
            <Text>Sign In</Text>
            <Link href="/(auth)/sign-up">
                <Text>Create Account</Text>
            </Link>
            <Link href="/" >
                <Text>Go to Home</Text>
            </Link>
        </View>
    )
}

export default SignIn