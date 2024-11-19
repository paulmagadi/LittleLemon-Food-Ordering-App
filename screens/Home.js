import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Hardcoded menu data
const menuData = [
    {
        id: 1,
        title: "Greek Salad",
        description: "The famous greek salad of crispy lettuce, peppers, olives, our Chicago.",
        price: 10,
        image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true",
        category: "starters",
    },
    {
        id: 2,
        title: "Lemon Desert",
        description: "Traditional homemade Italian Lemon Ricotta Cake.",
        price: 10,
        image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/lemonDessert%202.jpg?raw=true",
        category: "desserts",
    },
    {
        id: 3,
        title: "Grilled Fish",
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        price: 10,
        image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/grilledFish.jpg?raw=true",
        category: "mains",
    },
    {
        id: 4,
        title: "Pasta",
        description: "Penne with fried aubergines, cherry tomatoes, tomato sauce, fresh chilli, garlic, basil & salted ricotta cheese.",
        price: 10,
        image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/pasta.jpg?raw=true",
        category: "mains",
    },
    {
        id: 5,
        title: "Bruschetta",
        description: "Oven-baked bruschetta stuffed with tomatoes and herbs.",
        price: 10,
        image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/bruschetta.jpg?raw=true",
        category: "starters",
    },
];

const Home = () => {
    const [menuItems, setMenuItems] = useState(menuData); // All menu items
    const [filteredItems, setFilteredItems] = useState(menuData); // Filtered menu items
    const [searchQuery, setSearchQuery] = useState(''); // Search input
    const [activeCategory, setActiveCategory] = useState('All'); // Active category
    const navigation = useNavigation(); // Navigation for profile

    // Categories for filtering
    const categories = ['All', 'starters', 'mains', 'desserts'];

    // Filter items based on search query and active category
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();

        const filtered = menuItems.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(lowercasedQuery);
            const matchesCategory =
                activeCategory === 'All' || item.category === activeCategory;

            return matchesSearch && matchesCategory;
        });

        setFilteredItems(filtered);
    }, [searchQuery, activeCategory, menuItems]);

    // Render each menu item
    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View style={styles.menuTextContainer}>
                <Text style={styles.menuName}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </View>
    );

    // Render category buttons
    const renderCategoryButtons = () =>
        categories.map((category) => (
            <TouchableOpacity
                key={category}
                style={[
                    styles.categoryButton,
                    activeCategory === category && styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory(category)}
            >
                <Text
                    style={[
                        styles.categoryText,
                        activeCategory === category && styles.activeCategoryText,
                    ]}
                >
                    {category}
                </Text>
            </TouchableOpacity>
        ));

    // Render the header bar with avatar
    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Little Lemon</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')} // Navigate to profile
                style={styles.avatarContainer}
            >
                <Image
                    source={require('../assets/avatar.png')} // Replace with your avatar image
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Bar */}
            {renderHeader()}

            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Category Filters */}
            <View style={styles.categoryContainer}>{renderCategoryButtons()}</View>

            {/* Menu List */}
            <FlatList
                data={filteredItems}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No items match your search.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#495E57' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4CE14',
    },
    headerText: { fontSize: 24, fontWeight: 'bold', color: '#495E57' },
    avatarContainer: { width: 40, height: 40 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    searchBar: {
        margin: 16,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    categoryContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    categoryButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F4CE14',
    },
    activeCategoryButton: { backgroundColor: '#495E57' },
    categoryText: { color: '#495E57', fontSize: 14, fontWeight: 'bold' },
    activeCategoryText: { color: '#F4CE14' },
    listContainer: { paddingHorizontal: 16 },
    menuItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
    },
    menuImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
    menuTextContainer: { flex: 1 },
    menuName: { fontSize: 16, fontWeight: 'bold', color: '#495E57' },
    menuDescription: { fontSize: 14, color: '#7D7D7D', marginVertical: 5 },
    menuPrice: { fontSize: 14, color: '#495E57', fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    emptyText: { fontSize: 16, color: '#fff', textAlign: 'center' },
});

export default Home;
