import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { AppParamList } from "../../navigation/navigationTypes";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  AlmostDark,
  AlmostWhite,
  RedDark,
  RedLight,
} from "../../constants/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import { FlatList } from "react-native-gesture-handler";
import CocktailCard from "../../components/Main/CocktailCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

type NavigationProps = DrawerScreenProps<AppParamList, "MyProfile">;

const MyProfileScreen = ({ navigation, route }: NavigationProps) => {
  const currentUser = useSelector(selectUser);
  const cocktailData = [
    {
      id: "1",
      title: "Negroni",
      image: require("../../assets/cocktail-image-1.png"),
    },
    {
      id: "2",
      title: "Martini",
      image: require("../../assets/cocktail-image-3.png"),
    },
    {
      id: "3",
      title: "Russian Spring Punch",
      image: require("../../assets/cocktail-image-2.png"),
    },
    {
      id: "4",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
    {
      id: "5",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
    {
      id: "6",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
    {
      id: "7",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
    {
      id: "8",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
    {
      id: "9",
      title: "Old Fashioned",
      image: require("../../assets/cocktail-image-4.png"),
    },
  ];
  console.log(currentUser?.profileImage);
  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
          <View style={styles.profileSection}>
            {currentUser?.profileImage === "" ? (
              <View
                style={[
                  styles.profileImage,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: AlmostDark,
                  },
                ]}
              >
                <Feather name="user" size={35} color={RedLight} />
              </View>
            ) : (
              <Image
                source={{
                  uri:
                    "https://galore-mobile-bucket.s3.eu-central-1.amazonaws.com/userProfileImages/" +
                    currentUser?.profileImage,
                }}
                style={styles.profileImage}
              />
            )}

            <View style={{ paddingHorizontal: 21 }}>
              <Text style={styles.profileName}>
                {currentUser?.firstName + " " + currentUser?.lastName}
              </Text>
              <Text style={styles.profileEmail}>{currentUser?.email}</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Feather name="edit" size={16.8} color={AlmostWhite} />
            </Pressable>
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.line} />
            <Text style={styles.titleText}> My Favorites </Text>
            <View style={styles.line} />
          </View>
        </>
      )}
      renderItem={({ item }) => (
        <CocktailCard title={item.title} image={item.image} isSmall={true} />
      )}
      keyExtractor={(item) => item.id}
      data={cocktailData}
      numColumns={2}
      style={[styles.container]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  profileSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 50,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 75 / 2,
    borderWidth: 2,
    borderColor: RedLight,
    resizeMode: "cover",
  },
  editButton: {
    padding: 9.1,
    backgroundColor: RedLight,
    borderRadius: 50 / 2,
  },
  profileName: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    color: AlmostDark,
    textAlign: "left",
  },
  profileEmail: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: RedDark,
    textAlign: "left",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 50,
    marginBottom: 50,
  },
  line: {
    width: 45,
    height: 4,
    borderRadius: 45 / 2,
    backgroundColor: AlmostDark,
  },
  titleText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 32,
    color: AlmostDark,
    textAlign: "center",
  },
});
export default MyProfileScreen;
