import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs } from "../../constants/data";
import { Colors } from "../../constants/theme";

const TabsLayout = () => {
    const insets = useSafeAreaInsets();
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />
    }
    const TabIcon = ({ focused, icon }: { focused: boolean, icon: ImageSourcePropType }) => {
        return (
            <View className="items-center justify-center mt-8">
                {focused && (
                    <View className="absolute w-13 h-13 bg-white rounded-full" />
                )}

                <Image
                    source={icon}
                    className="w-7 h-7"
                    resizeMode="contain"
                    tintColor={
                        focused ? Colors.light.tint : Colors.light.background
                    }
                />
            </View>
        )
    }
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { position: "absolute", bottom: Math.max(insets.bottom, 12), height: 68, marginHorizontal: 22, borderRadius: 100, backgroundColor: Colors.dark.background } }}>
            {tabs.map((tab) => (
                <Tabs.Screen key={tab.name} name={tab.name} options={{
                    title: tab.title, tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={tab.icon} />
                    )
                }} />
            ))}
        </Tabs>
    );
};

export default TabsLayout;