import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Plus, X, Camera, Save } from "lucide-react-native";
import Header from "../components/Header";
import * as Haptics from "expo-haptics";

export default function CreateChecklistScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<
    Array<{ id: string; name: string; hasPhoto: boolean }>
  >([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newInstruction, setNewInstruction] = useState("");

  const categories = [
    "Respiratory",
    "Gastrointestinal",
    "Wound Care",
    "Vascular Access",
    "Neurological",
    "Cardiac",
    "Orthopedic",
    "Other",
  ];

  const addItem = () => {
    if (newItemName.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newItem = {
        id: `item-${Date.now()}`,
        name: newItemName.trim(),
        hasPhoto: false,
      };
      setItems([...items, newItem]);
      setNewItemName("");
    }
  };

  const removeItem = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(items.filter((item) => item.id !== id));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction("");
    }
  };

  const removeInstruction = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Validate required fields
    if (!title.trim()) {
      alert("Please enter a title for the checklist");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one item to the checklist");
      return;
    }

    // In a real app, this would save to a database
    console.log("Saving checklist:", {
      title,
      description,
      category,
      items,
      instructions,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Navigate back to home screen
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Create New Checklist" showBackButton={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 p-4">
          {/* Title input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">Title *</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white"
              placeholder="Enter checklist title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white"
              placeholder="Enter checklist description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Category selection */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">Category *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className={`px-4 py-2 mr-2 rounded-full ${category === cat ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <Text
                    className={`${category === cat ? "text-white" : "text-gray-700"} font-medium`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Items section */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">Items *</Text>
            <View className="flex-row items-center mb-2">
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 bg-white mr-2"
                placeholder="Add item"
                value={newItemName}
                onChangeText={setNewItemName}
                onSubmitEditing={addItem}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={addItem}
                className="bg-blue-500 p-3 rounded-lg"
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Item list */}
            {items.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200"
              >
                <Text className="flex-1 text-gray-800">{item.name}</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => console.log("Add photo for", item.id)}
                    className="p-2 mr-1"
                  >
                    <Camera size={20} color="#4B5563" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    className="p-2"
                  >
                    <X size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Instructions section */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">
              Procedure Instructions (Optional)
            </Text>
            <View className="flex-row items-center mb-2">
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 bg-white mr-2"
                placeholder="Add instruction"
                value={newInstruction}
                onChangeText={setNewInstruction}
                onSubmitEditing={addInstruction}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={addInstruction}
                className="bg-blue-500 p-3 rounded-lg"
              >
                <Plus size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Instructions list */}
            {instructions.map((instruction, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200"
              >
                <Text className="flex-1 text-gray-800">
                  {index + 1}. {instruction}
                </Text>
                <TouchableOpacity
                  onPress={() => removeInstruction(index)}
                  className="p-2"
                >
                  <X size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Bottom padding */}
          <View className="h-24" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save button */}
      <TouchableOpacity
        onPress={handleSave}
        className="absolute bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
      >
        <Save size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
