import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,Text,TextInput,FlatList,Dimensions,StyleSheet,Image,Pressable,ScrollView,TouchableOpacity,} from 'react-native';
import COLORS from '../consts/colors';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import furnitures from '../consts/furnitures';
const { width } = Dimensions.get('screen');
import Header from './Header';
import HomeBar from './HomeBar';
import Login from '../login/Login';
import CartScreen from './CartScreen'
const HomeScreen = ({ navigation }) => {
    const categoryItems = [
      { name: 'All', iconName: 'seat-outline' },
      { name: 'Men', iconName: 'table-furniture' },
      { name: 'Women', iconName: 'cupboard-outline' },
      { name: 'Other', iconName: 'bed-queen-outline' },
    ];
  
  

  const [products, setProducts] = useState([]);
  useEffect(() => {
    callAPI();
  }, []);

  const handleLoginPress = () => {
    // Implement your logic for handling login press
 };
 const fetchAllProducts = () => {
  resetProducts();
};

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(function () {
        console.log('Finally called');
      });
  };
  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoriesContainer}>
        {categoryItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={[
                style.categoryItemBtn,
                {
                  backgroundColor:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.light,
                },
              ]}>
              <Icon
                name={item.iconName}
                size={20}
                color={
                  selectedCategoryIndex == index ? COLORS.white : COLORS.primary
                }
              />
              <Text
                style={[
                  style.categoryText,
                  {
                    color:
                      selectedCategoryIndex == index
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
 
  
  const navigateToProductDetail = (item) => {
    navigation.navigate('DetailsScreen', { item });
  };
  const Card = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigateToProductDetail(item)}>
        <View style={style.card}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 140, width: '60%', borderRadius: 10 }}
          />

          <Text style={style.cardName}>{item.title}</Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={style.price}>{item.price}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={style.rating}>4.3</Text>
              <Icon name="star"  color={COLORS.yellow} size={18} style={style.starIcon} />

            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  const PopularItemCard = ({ item }) => {
    return (
      <SafeAreaView onPress={() => navigateToProductDetail(item)}>
        <View style={style.popularItemCard}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 120,
              height: '140%',
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              marginRight: 15,
            }}
          />
          <View style={{ paddingVertical: 15, justifyContent: 'center' }}>
            <Text style={style.cardName}>{item.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={style.price}>{item.price}</Text>
              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Icon name="star" color={COLORS.yellow} size={18} />
                <Text style={style.rating}>4.3</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

    );
  };

  
  const keyExtractor = (item, index) => index.toString();
  return (
    <>
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Header container */}
      <View style={style.header}>
      <Image source={require('../assets/logo2.jpg')} style={style.logo} />
      <Text style={style.headerTitle}>SHOP OF NTTH</Text>
      
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView >
          <Header></Header>
        </ScrollView>
        <Text style={style.title}>Categories</Text>
        {/* Render categories */}
        <ListCategories />

        <View style={style.logoContainer}>
      </View>
        {/* Render To Furnitures */}
        <Text style={style.title}>Top Furniture</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
          data={products}
          horizontal
          renderItem={Card}
          keyExtractor={keyExtractor}
        />
        {/* Render To Popular */}
        <Text style={style.title}>Popular</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
          data={products}
          renderItem={Card}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    </SafeAreaView>
    <HomeBar></HomeBar>
    </>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color:'pink',
    fontSize: 25,
    marginTop:15,
    marginRight: 60,
    fontWeight: 'bold',
    width: '55%',
    lineHeight: 30,
    paddingHorizontal: -10,
  },
  userIcon: {
    marginTop:15,
    paddingRight: 5, 
    marginHorizontal: -20,

  },
  logo:{
    marginLeft: -20,
    width: 50,
    height: 50,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  

  
  categoryItemBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 5,
  },
  card: {
    height: 200,
    backgroundColor: COLORS.white,
    elevation: 15,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    
  },
  cardName: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  price: { 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    fontSize: 12 ,
    marginTop:10
  },
  rating: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 12,
    marginTop:10
  },
  starIcon: {
    marginTop: 10,
    marginLeft:2
  },  
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    paddingHorizontal: 20,
    marginTop:15
  },
  iconContainer: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    position: 'absolute',
    elevation: 2,
    right: 15,
    top: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  popularItemCard: {
    height: 100,
    width: width - 100,
    backgroundColor: COLORS.white,
    elevation: 10,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },

  
});
export default HomeScreen;