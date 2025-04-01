import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Plus, Filter } from "lucide-react-native";
import ChecklistCard from "./ChecklistCard";

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  itemCount: number;
  lastUpdated: string;
  thumbnailUrl: string;
}

interface ChecklistListProps {
  checklists?: ChecklistItem[];
  isLoading?: boolean;
  onChecklistPress?: (id: string) => void;
  onShareChecklist?: (id: string) => void;
  onEditChecklist?: (id: string) => void;
  onDeleteChecklist?: (id: string) => void;
  onCreateChecklist?: () => void;
  onFilterPress?: () => void;
}

const ChecklistList = ({
  checklists = [
    {
      id: "1",
      title: "Tracheostomy Preparation",
      category: "Respiratory",
      itemCount: 12,
      lastUpdated: "2 days ago",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
    },
    {
      id: "2",
      title: "NGT Insertion",
      category: "Gastrointestinal",
      itemCount: 8,
      lastUpdated: "1 week ago",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&q=80",
    },
    {
      id: "3",
      title: "Wound Dressing",
      category: "Wound Care",
      itemCount: 15,
      lastUpdated: "3 days ago",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
    },
    {
      id: "4",
      title: "IV Cannulation",
      category: "Vascular Access",
      itemCount: 10,
      lastUpdated: "Yesterday",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
    },
  ],
  isLoading = false,
  onChecklistPress = (id) => console.log(`Checklist ${id} pressed`),
  onShareChecklist = (id) => console.log(`Share checklist ${id}`),
  onEditChecklist = (id) => console.log(`Edit checklist ${id}`),
  onDeleteChecklist = (id) => console.log(`Delete checklist ${id}`),
  onCreateChecklist = () => console.log("Create new checklist"),
  onFilterPress = () => console.log("Filter pressed"),
}: ChecklistListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Respiratory",
    "Gastrointestinal",
    "Wound Care",
    "Vascular Access",
    "Neurological",
  ];

  const filteredChecklists =
    selectedCategory && selectedCategory !== "All"
      ? checklists.filter(
          (checklist) => checklist.category === selectedCategory,
        )
      : checklists;

  const renderEmptyList = () => (
    <View className="flex-1 justify-center items-center py-10">
      <Text className="text-gray-500 text-lg mb-4">No checklists found</Text>
      <TouchableOpacity
        onPress={onCreateChecklist}
        className="bg-blue-500 px-4 py-2 rounded-lg flex-row items-center"
      >
        <Plus size={18} color="#FFFFFF" />
        <Text className="text-white font-medium ml-2">
          Create New Checklist
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Category filter */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between px-4 py-2">
          <Text className="text-gray-700 font-bold">Categories</Text>
          <TouchableOpacity
            onPress={onFilterPress}
            className="flex-row items-center"
          >
            <Filter size={16} color="#4B5563" />
            <Text className="text-gray-600 ml-1 text-sm">Filter</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          className="px-2"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item === "All" ? null : item)}
              className={`px-4 py-2 mx-2 rounded-full ${selectedCategory === item || (item === "All" && !selectedCategory) ? "bg-blue-500" : "bg-gray-200"}`}
            >
              <Text
                className={`${selectedCategory === item || (item === "All" && !selectedCategory) ? "text-white" : "text-gray-700"} font-medium`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-500 mt-4">Loading checklists...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChecklists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
          ListEmptyComponent={renderEmptyList}
          renderItem={({ item }) => (
            <ChecklistCard
              id={item.id}
              title={item.title}
              category={item.category}
              itemCount={item.itemCount}
              lastUpdated={item.lastUpdated}
              thumbnailUrl={item.thumbnailUrl}
              onPress={() => onChecklistPress(item.id)}
              onShare={() => onShareChecklist(item.id)}
              onEdit={() => onEditChecklist(item.id)}
              onDelete={() => onDeleteChecklist(item.id)}
            />
          )}
        />
      )}

      {/* Floating action button for creating new checklist */}
      <TouchableOpacity
        onPress={onCreateChecklist}
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ChecklistList;
