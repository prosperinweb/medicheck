import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, Circle, Share2, Edit } from "lucide-react-native";
import Header from "../components/Header";

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  // Mock data for the selected checklist
  const mockChecklists = {
    "1": {
      id: "1",
      title: "Tracheostomy Preparation",
      category: "Respiratory",
      description: "Complete preparation checklist for tracheostomy procedure",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
      items: [
        {
          id: "1-1",
          name: "Tracheostomy tube (appropriate size)",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "1-2", name: "Obturator", hasPhoto: false },
        { id: "1-3", name: "10ml syringe", hasPhoto: false },
        {
          id: "1-4",
          name: "Sterile gloves",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "1-5", name: "Sterile dressing pack", hasPhoto: false },
        { id: "1-6", name: "Cleaning solution", hasPhoto: false },
        {
          id: "1-7",
          name: "Suction equipment",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "1-8", name: "Tracheostomy ties", hasPhoto: false },
        { id: "1-9", name: "Scissors", hasPhoto: false },
        { id: "1-10", name: "Stitch cutter", hasPhoto: false },
        { id: "1-11", name: "Spare tracheostomy tube", hasPhoto: false },
        { id: "1-12", name: "Emergency equipment", hasPhoto: false },
      ],
      instructions: [
        "Ensure patient is properly positioned with neck extended",
        "Verify all equipment is present and functioning",
        "Maintain sterile field throughout procedure",
        "Have emergency equipment readily available",
      ],
    },
    "2": {
      id: "2",
      title: "NGT Insertion",
      category: "Gastrointestinal",
      description:
        "Nasogastric tube insertion preparation and procedure checklist",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&q=80",
      items: [
        {
          id: "2-1",
          name: "NGT (appropriate size)",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "2-2", name: "pH testing strips", hasPhoto: false },
        { id: "2-3", name: "Lubricating gel", hasPhoto: false },
        { id: "2-4", name: "Tape or securing device", hasPhoto: false },
        { id: "2-5", name: "Gloves", hasPhoto: false },
        { id: "2-6", name: "Towel", hasPhoto: false },
        { id: "2-7", name: "Cup of water with straw", hasPhoto: false },
        { id: "2-8", name: "Suction equipment", hasPhoto: false },
      ],
      instructions: [
        "Explain procedure to patient and obtain consent",
        "Measure NEX distance (Nose to Earlobe to Xiphoid process)",
        "Position patient upright if possible",
        "Verify placement with pH testing and/or X-ray",
      ],
    },
    "3": {
      id: "3",
      title: "Wound Dressing",
      category: "Wound Care",
      description: "Standard wound dressing change procedure checklist",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
      items: [
        { id: "3-1", name: "Sterile dressing pack", hasPhoto: false },
        { id: "3-2", name: "Sterile gloves", hasPhoto: false },
        { id: "3-3", name: "Cleaning solution", hasPhoto: false },
        {
          id: "3-4",
          name: "Appropriate dressing",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "3-5", name: "Tape or securing material", hasPhoto: false },
        { id: "3-6", name: "Disposal bag", hasPhoto: false },
        { id: "3-7", name: "Scissors", hasPhoto: false },
        { id: "3-8", name: "Gauze", hasPhoto: false },
        { id: "3-9", name: "Saline solution", hasPhoto: false },
        { id: "3-10", name: "Protective apron", hasPhoto: false },
        { id: "3-11", name: "Face mask (if required)", hasPhoto: false },
        { id: "3-12", name: "Wound measuring tool", hasPhoto: false },
        { id: "3-13", name: "Documentation materials", hasPhoto: false },
        { id: "3-14", name: "Pain medication (if needed)", hasPhoto: false },
        { id: "3-15", name: "Camera for wound documentation", hasPhoto: false },
      ],
      instructions: [
        "Assess wound before removing old dressing",
        "Clean from center outward in circular motion",
        "Avoid touching sterile surfaces",
        "Document wound appearance and dressing change",
      ],
    },
    "4": {
      id: "4",
      title: "IV Cannulation",
      category: "Vascular Access",
      description: "Intravenous cannulation procedure preparation checklist",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
      items: [
        {
          id: "4-1",
          name: "IV cannula (appropriate size)",
          hasPhoto: true,
          photoUrl:
            "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&q=80",
        },
        { id: "4-2", name: "Tourniquet", hasPhoto: false },
        { id: "4-3", name: "Alcohol swabs", hasPhoto: false },
        { id: "4-4", name: "Sterile gauze", hasPhoto: false },
        { id: "4-5", name: "Sterile transparent dressing", hasPhoto: false },
        { id: "4-6", name: "Tape", hasPhoto: false },
        { id: "4-7", name: "Gloves", hasPhoto: false },
        { id: "4-8", name: "Sharps container", hasPhoto: false },
        {
          id: "4-9",
          name: "IV fluid and administration set (if required)",
          hasPhoto: false,
        },
        { id: "4-10", name: "Label for cannula", hasPhoto: false },
      ],
      instructions: [
        "Select appropriate vein and cannula size",
        "Apply tourniquet 10-15cm above insertion site",
        "Clean site with alcohol swab and allow to dry",
        "Document date, time, and site of insertion",
      ],
    },
  };

  const checklist = mockChecklists[id as keyof typeof mockChecklists];

  if (!checklist) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Header title="Checklist Not Found" showBackButton={true} />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-gray-800">Checklist not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleSharePress = () => {
    console.log(`Sharing checklist ${id}`);
  };

  const handleEditPress = () => {
    router.push(`/edit-checklist/${id}`);
  };

  const completionPercentage =
    checklist.items.length > 0
      ? Math.round((completedItems.length / checklist.items.length) * 100)
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        title={checklist.title}
        showBackButton={true}
        showShareButton={true}
        onSharePress={handleSharePress}
      />

      <ScrollView className="flex-1">
        {/* Checklist header with image */}
        <View className="w-full h-48 bg-gray-200">
          <Image
            source={{ uri: checklist.thumbnailUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <Text className="text-white text-xl font-bold">
              {checklist.title}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-white text-sm font-medium">
                {checklist.category}
              </Text>
              <Text className="text-white mx-2">•</Text>
              <Text className="text-white text-sm">
                {checklist.items.length} items
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="p-4 bg-white">
          <Text className="text-gray-700">{checklist.description}</Text>
        </View>

        {/* Progress bar */}
        <View className="mx-4 mt-2 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Completion
            </Text>
            <Text className="text-sm font-medium text-gray-700">
              {completionPercentage}%
            </Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </View>
        </View>

        {/* Checklist items */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">Items</Text>
          {checklist.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleItemCompletion(item.id)}
              className="flex-row items-center py-3 border-b border-gray-200"
            >
              {completedItems.includes(item.id) ? (
                <CheckCircle2 size={24} color="#10B981" />
              ) : (
                <Circle size={24} color="#6B7280" />
              )}
              <View className="flex-1 ml-3">
                <Text
                  className={`text-base ${completedItems.includes(item.id) ? "text-gray-500 line-through" : "text-gray-800"}`}
                >
                  {item.name}
                </Text>
              </View>
              {item.hasPhoto && (
                <TouchableOpacity
                  onPress={() => console.log(`View photo for ${item.id}`)}
                  className="ml-2"
                >
                  <Image
                    source={{ uri: item.photoUrl }}
                    className="w-10 h-10 rounded"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Instructions section */}
        {checklist.instructions && checklist.instructions.length > 0 && (
          <View className="p-4 mt-2 bg-blue-50">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Procedure Instructions
            </Text>
            {checklist.instructions.map((instruction, index) => (
              <View key={index} className="flex-row mb-3">
                <Text className="text-blue-600 font-bold mr-2">
                  {index + 1}.
                </Text>
                <Text className="flex-1 text-gray-700">{instruction}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Bottom padding */}
        <View className="h-24" />
      </ScrollView>

      {/* Edit button */}
      <TouchableOpacity
        onPress={handleEditPress}
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
      >
        <Edit size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
