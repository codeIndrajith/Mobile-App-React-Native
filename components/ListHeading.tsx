import { Text, TouchableOpacity, View } from "react-native";

interface ListHeadingProps {
    title: string;
    subtitle?: string;
}

const ListHeading = ({ title, subtitle }: ListHeadingProps) => {
    return (
        <View className="list-heading">
            <View>
                <Text className="list-heading-title">{title}</Text>
                {subtitle && <Text className="list-heading-subtitle">{subtitle}</Text>}
            </View>

            <TouchableOpacity>
                <Text className="list-heading-button">View All</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListHeading;