import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../redux/slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = (props) => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  // const origin = true;

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            { opacity: origin ? (pressed ? 0.5 : 1.0) : 0.4 },
            tw`p-2 pb-8 pt-4 pl-6 bg-gray-200 m-2 w-40`,
          ]}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`text-lg mt-2 font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              type="antdesign"
              color="white"
            />
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
