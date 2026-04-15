import SettingItem from "@/components/SettingItem";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
    const { user } = useUser();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (err) {
            console.error("Logout error", err);
        }
    };



    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className="px-6">
                <Text className="text-3xl font-bold mt-4 mb-8 text-neutral-900">Settings</Text>
                <View className="flex-row items-center mb-10 bg-neutral-50 p-4 rounded-2xl">
                    {user?.imageUrl && (
                        <Image
                            source={{ uri: user.imageUrl }}
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    <View className="ml-4">
                        <Text className="text-lg font-semibold text-neutral-900">
                            {user?.fullName || "User"}
                        </Text>
                        <Text className="text-sm text-neutral-500">
                            {user?.primaryEmailAddress?.emailAddress || "No email linked"}
                        </Text>
                    </View>
                </View>
                <View className="mb-8">
                    <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Account</Text>
                    <SettingItem icon="person-outline" label="Personal Information" onPress={() => { }} />
                    <SettingItem icon="notifications-outline" label="Notifications" onPress={() => { }} />
                    <SettingItem icon="shield-checkmark-outline" label="Security" onPress={() => { }} />
                </View>
                <View className="mb-8">
                    <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Support</Text>
                    <SettingItem icon="help-circle-outline" label="Help Center" onPress={() => { }} />
                    <SettingItem icon="document-text-outline" label="Terms of Service" onPress={() => { }} />
                </View>
                <View className="mt-4 mb-10">
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="flex-row items-center justify-center p-4 rounded-xl bg-red-100"
                    >
                        <Ionicons name="log-out-outline" size={20} color="#a91a1aff" />
                        <Text className="ml-2 text-red-500 font-semibold text-base">Log Out</Text>
                    </TouchableOpacity>

                    <Text className="text-center text-neutral-400 text-xs mt-6">
                        Version 1.0.0
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;