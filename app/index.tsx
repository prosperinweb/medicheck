import React, { useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ChecklistList from "./components/ChecklistList";
import CreateButton from "./components/CreateButton";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for checklists
  const mockChecklists = [
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
  ];

  // Filter checklists based on search query
  const filteredChecklists = searchQuery
    ? mockChecklists.filter(
        (checklist) =>
          checklist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          checklist.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockChecklists;

  // Handlers for checklist actions
  const handleChecklistPress = (id: string) => {
    router.push(`/checklist/${id}`);
  };

  const handleCreateChecklist = () => {
    router.push("/create-checklist");
  };

  const handleShareChecklist = (id: string) => {
    // Implementation for sharing checklist
    console.log(`Share checklist ${id}`);
  };

  const handleEditChecklist = (id: string) => {
    router.push(`/edit-checklist/${id}`);
  };

  const handleDeleteChecklist = (id: string) => {
    // Implementation for deleting checklist
    console.log(`Delete checklist ${id}`);
  };

  const handleMenuPress = () => {
    // Implementation for menu press
    console.log("Menu pressed");
  };

  const handleFilterPress = () => {
    // Implementation for filter press
    console.log("Filter pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View className="flex-1">
        <Header
          title="Medical Procedure Checklists"
          showBackButton={false}
          showMenuButton={true}
          onMenuPress={handleMenuPress}
        />
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search checklists by name or category..."
        />
        <ChecklistList
          checklists={filteredChecklists}
          onChecklistPress={handleChecklistPress}
          onShareChecklist={handleShareChecklist}
          onEditChecklist={handleEditChecklist}
          onDeleteChecklist={handleDeleteChecklist}
          onCreateChecklist={handleCreateChecklist}
          onFilterPress={handleFilterPress}
        />
        <CreateButton onPress={handleCreateChecklist} />
      </View>
    </SafeAreaView>
  );
}
