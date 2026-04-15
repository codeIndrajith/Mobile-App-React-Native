import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require("../assets/splash-3.jpg")}
                style={{ flex: 1, width: "100%", height: "100%" }}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.95)", "black"]}
                    className="flex-1 justify-end"
                >
                    <SafeAreaView className="px-8 pb-12">
                        <View className="mb-10 px-4">
                            <Text className="text-white text-5xl font-black tracking-tight leading-[56px]">
                                Master Your{"\n"}
                                Subscriptions.
                            </Text>

                            <Text className="text-zinc-400 text-lg mt-6 leading-7 font-medium">
                                Elegantly track all your monthly plans, renewal dates, and spending habits in one powerful dashboard.
                            </Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => router.replace("/(tabs)")}
                            className="bg-white py-5 mx-4 rounded-full items-center shadow-2xl mb-6"
                        >
                            <Text className="text-black font-bold text-xl">Get Started</Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center items-center mb-4">
                            <Text className="text-zinc-500 text-sm font-medium">
                                Already using Subscribed?{" "}
                            </Text>
                            <Link href="/sign-in" asChild>
                                <TouchableOpacity>
                                    <Text className="text-white font-bold text-sm">Sign In</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default Onboarding;
