import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
    // State for profile fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState(null); // Avatar image
    const [emailNotifications, setEmailNotifications] = useState(false);

    // Load user data from AsyncStorage
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const userData = JSON.parse(data);
                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setEmail(userData.email || '');
                    setPhoneNumber(userData.phoneNumber || '');
                    setAvatar(userData.avatar || null);
                    setEmailNotifications(userData.emailNotifications || false);
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            }
        };

        loadUserData();
    }, []);

    // Save user data to AsyncStorage
    const saveChanges = async () => {
        try {
            const userData = {
                firstName,
                lastName,
                email,
                phoneNumber,
                avatar,
                emailNotifications,
            };
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            Alert.alert('Success', 'Your changes have been saved.');
        } catch (error) {
            console.error('Failed to save user data', error);
            Alert.alert('Error', 'Failed to save your changes.');
        }
    };

    // Logout and clear AsyncStorage
    const logout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('Onboarding'); // Ensure 'Onboarding' is always available
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    // Handle image picker
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    // Render placeholder initials
    const renderInitials = () => {
        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`.toUpperCase();
        }
        return 'LL'; // Default initials
    };

    return (
        <View style={styles.container}>
            {/* Profile Image */}
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar}>
                        <Text style={styles.avatarInitials}>{renderInitials()}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            {/* Email Notifications Switch */}
            <View style={styles.notificationRow}>
                <Text style={styles.label}>Email Notifications</Text>
                <Switch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                />
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4CE14', // Brand yellow background
    },
    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#495E57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        color: '#F4CE14',
        fontSize: 32,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#495E57',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    notificationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#495E57',
    },
    saveButton: {
        backgroundColor: '#495E57',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#F4CE14',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
