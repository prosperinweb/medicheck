import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Share2, Edit, Trash2, Clock } from "lucide-react-native";

interface ChecklistCardProps {
  id?: string;
  title?: string;
  category?: string;
  itemCount?: number;
  lastUpdated?: string;
  thumbnailUrl?: string;
  onPress?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ChecklistCard = ({
  id = "1",
  title = "Tracheostomy Preparation",
  category = "Respiratory",
  itemCount = 12,
  lastUpdated = "2 days ago",
  thumbnailUrl = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
  onPress = () => console.log("Checklist pressed"),
  onShare = () => console.log("Share pressed"),
  onEdit = () => console.log("Edit pressed"),
  onDelete = () => console.log("Delete pressed"),
}: ChecklistCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg shadow-md mb-4 overflow-hidden border border-gray-200"
    >
      <View className="flex-row">
        {/* Thumbnail */}
        <View className="w-24 h-full bg-gray-100">
          <Image
            source={{ uri: thumbnailUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View className="flex-1 p-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text className="text-lg font-bold text-gray-800">{title}</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-sm text-blue-600 font-medium">
                  {category}
                </Text>
                <Text className="text-sm text-gray-500 mx-2">•</Text>
                <Text className="text-sm text-gray-500">{itemCount} items</Text>
              </View>
            </View>
          </View>

          {/* Last updated */}
          <View className="flex-row items-center mt-2">
            <Clock size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">{lastUpdated}</Text>
          </View>

          {/* Action buttons */}
          <View className="flex-row justify-end mt-2">
            <TouchableOpacity
              onPress={onShare}
              className="p-2 rounded-full mr-2"
            >
              <Share2 size={18} color="#4B5563" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onEdit}
              className="p-2 rounded-full mr-2"
            >
              <Edit size={18} color="#4B5563" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} className="p-2 rounded-full">
              <Trash2 size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChecklistCard;
