import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus, X, Camera, Save, Trash2 } from "lucide-react-native";
import Header from "../components/Header";
import * as Haptics from "expo-haptics";

interface ChecklistItem {
  id: string;
  name: string;
  hasPhoto: boolean;
  photoUrl?: string;
}

export default function EditChecklistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [newItemName, setNewItemName] = useState("");
  const [newInstruction, setNewInstruction] = useState("");

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

  // Load checklist data
  useEffect(() => {
    const checklist = mockChecklists[id as keyof typeof mockChecklists];
    if (checklist) {
      setTitle(checklist.title);
      setDescription(checklist.description);
      setCategory(checklist.category);
      setItems(checklist.items);
      setInstructions(checklist.instructions);
      setThumbnailUrl(checklist.thumbnailUrl);
    } else {
      // Handle case where checklist is not found
      Alert.alert("Error", "Checklist not found", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }, [id]);

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
      Alert.alert("Error", "Please enter a title for the checklist");
      return;
    }

    if (!category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    if (items.length === 0) {
      Alert.alert("Error", "Please add at least one item to the checklist");
      return;
    }

    // In a real app, this would update the database
    console.log("Updating checklist:", {
      id,
      title,
      description,
      category,
      items,
      instructions,
      thumbnailUrl,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Navigate back to checklist detail
    router.push(`/checklist/${id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Checklist",
      "Are you sure you want to delete this checklist? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // In a real app, this would delete from the database
            console.log(`Deleting checklist ${id}`);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push("/");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Edit Checklist" showBackButton={true} />

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
                    onPress={() => console.log("Add/view photo for", item.id)}
                    className="p-2 mr-1"
                  >
                    <Camera
                      size={20}
                      color={item.hasPhoto ? "#3B82F6" : "#4B5563"}
                    />
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

          {/* Delete button */}
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-100 p-4 rounded-lg mb-4 flex-row items-center justify-center"
          >
            <Trash2 size={20} color="#EF4444" />
            <Text className="text-red-500 font-medium ml-2">
              Delete Checklist
            </Text>
          </TouchableOpacity>

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
