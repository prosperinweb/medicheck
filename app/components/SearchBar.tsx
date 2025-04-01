import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar = ({
  onSearch = () => {},
  placeholder = "Search checklists by name or category...",
  initialValue = "",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View className="w-full px-4 py-2 bg-white">
      <View className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg">
        <Search size={20} color="#6b7280" />
        <TextInput
          className="flex-1 ml-2 text-base text-gray-800"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={handleChangeText}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <X size={18} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
