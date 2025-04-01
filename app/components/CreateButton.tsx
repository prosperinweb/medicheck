import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface CreateButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
}

const CreateButton = ({
  onPress,
  size = 60,
  color = "#ffffff",
}: CreateButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    // Provide haptic feedback when button is pressed
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // If onPress prop is provided, use it, otherwise navigate to create page
    if (onPress) {
      onPress();
    } else {
      // Navigate to checklist creation screen (to be implemented)
      router.push("/create-checklist");
    }
  };

  return (
    <View className="absolute bottom-6 right-6 z-10">
      <TouchableOpacity
        onPress={handlePress}
        className="bg-blue-600 rounded-full shadow-lg items-center justify-center"
        style={{
          width: size,
          height: size,
          elevation: 4,
        }}
        activeOpacity={0.8}
      >
        <Plus size={size * 0.5} color={color} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default CreateButton;
