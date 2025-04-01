import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Menu, ArrowLeft, Share2 } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
  onSharePress?: () => void;
}

const Header = ({
  title = "Medical Procedure Checklists",
  showBackButton = false,
  showShareButton = false,
  showMenuButton = true,
  onMenuPress = () => {},
  onSharePress = () => {},
}: HeaderProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View className="w-full h-16 px-4 flex-row items-center justify-between bg-white border-b border-gray-200">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            className="mr-2 p-2"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
      </View>

      <View className="flex-row items-center">
        {showShareButton && (
          <TouchableOpacity
            onPress={onSharePress}
            className="ml-2 p-2"
            accessibilityLabel="Share checklist"
          >
            <Share2 size={22} color="#0f172a" />
          </TouchableOpacity>
        )}
        {showMenuButton && (
          <TouchableOpacity
            onPress={onMenuPress}
            className="ml-2 p-2"
            accessibilityLabel="Open menu"
          >
            <Menu size={24} color="#0f172a" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
