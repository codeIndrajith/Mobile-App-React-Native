import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTION } from "@/constants/data";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatCurrency } from "../lib/utiils";


export default function App() {
  const renderHeader = () => (
    <>
      <View className="home-header flex-row items-center justify-between px-5 pt-4">
        <View className="flex-1">
          <Text className="text-gray-500 text-xl">
            {HOME_USER.date}
          </Text>

          <Text className="text-2xl font-bold mt-1">
            Hi, {HOME_USER.name}
          </Text>
        </View>

        <View className="ml-4">
          <Image
            source={{ uri: HOME_USER.profilePic }}
            className="w-24 h-24 rounded-full object-fit"
          />
        </View>
      </View>

      <View className="home-balance-card m-4 flex flex-col justify-between">
        <Text className="text-2xl font-bold text-white">Current Balance</Text>

        <View className="home-balance-row mt-4">
          <Text className="home-balance-text">
            {formatCurrency(HOME_BALANCE.currentBalance)}
          </Text>
          <Text className="text-gray-200 text-md">
            Next Renewal: {HOME_BALANCE.nextRenewal}
          </Text>
        </View>
      </View>

      <View className="home-upcoming-subscriptions m-4">
        <ListHeading title="Upcoming" subtitle="You have 3 upcoming subscriptions" />
        <FlatList
          data={UPCOMING_SUBSCRIPTION}
          renderItem={({ item }) => <UpcomingSubscriptionCard subscription={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text className="text-gray-500 text-md">No upcoming subscriptions</Text>}
        />
      </View>

      <View className="m-4 mb-2">
        <ListHeading title="All Subscriptions" subtitle="Manage all your subscriptions" />
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={HOME_SUBSCRIPTIONS}
        renderItem={({ item }) => (
          <View className="px-4">
            <SubscriptionCard subscription={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View className="px-4">
            <Text className="text-gray-500 text-md">No subscriptions found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
}
