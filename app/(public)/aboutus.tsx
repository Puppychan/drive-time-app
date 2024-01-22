import React from 'react';
import { View, Image, StatusBar, SafeAreaView, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Profile {
    name: string;
    title: string;
    phone: string;
    email: string;
    image: number;
}

interface CardButtonProps {
    title: string;
    link: string;
    iconName: string;
}

const CardButton: React.FC<CardButtonProps> = ({ title, link, iconName }) => {
    return (
        <TouchableOpacity
            style={styles.cardButton}
            onPress={() => Linking.openURL(link)}
        >
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/ic_info.png')} />
            </View>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const ProfileCard: React.FC<Profile> = ({ name, title, phone, email, image }) => {
    return (
        <View style={styles.profileContainer}>
            <Image style={styles.avatar} source={image} />

            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>Tel: {phone}</Text>
                <Text style={styles.subTitle}>Email: {email}</Text>
            </View>
        </View>
    );
};

export default function Page() {
    const profiles: Profile[] = [
        { name: 'Quoc Doan', title: 'Software Engineer', phone: '(+84) 838756241', email: 'huuquoc7603', image: require('../../assets/ic_quoc.jpg') },
        { name: 'N.D. Viet', title: 'Software Engineer', phone: '(+84) 838756241', email: 'vietngu123', image: require('../../assets/ic_viet.jpg') },
        { name: 'T. Nhung', title: 'Software Engineer', phone: '(+84) 838756241', email: 'nhungchan123', image: require('../../assets/ic_nhung.jpg') },
        { name: 'T.V.Q. Anh', title: 'Software Engineer', phone: '(+84) 838756241', email: 'anhchan123', image: require('../../assets/ic_quanh.jpg') },
        { name: 'T.H. Khanh', title: 'Software Engineer', phone: '(+84) 838756241', email: 'khanhchan123', image: require('../../assets/ic_khanh.jpg') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../../assets/logo_no_background.png')} />
                    <Text style={styles.headerText}>Where business, unique, and convenience meet</Text>
                    <Text style={styles.subHeaderText}>
                        City in a snap: Book rides, relax, arrive. Enjoy effortless journeys with our easy app. Reliable cars, smooth trips, all devices. Try it now!
                    </Text>
                </View>

                {/* Team Section */}
                <View style={styles.teamSection}>
                    <Text style={styles.sectionHeader}>Meet the team</Text>
                    <Text style={styles.sectionText}>
                        We're not just Grab. Our team is dedicated to creating user-centered designs that not only look great but also drive results. We understand that in today's world, user experience is everything.
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.cardContainer}>
                            {profiles.map((profile, index) => (
                                <View key={index} style={styles.cardItem}>
                                    <ProfileCard {...profile} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Statistics Section */}
                <View style={styles.statisticsSection}>
                    <Text style={styles.sectionHeader}>Our Statistics</Text>
                    <View style={styles.statisticsGrid}>
                        <View style={styles.statisticItem}>
                            <Text style={styles.statisticNumber}>32</Text>
                            <Text style={styles.statisticLabel}>Clients</Text>
                        </View>
                        <View style={styles.statisticItem}>
                            <Text style={styles.statisticNumber}>100</Text>
                            <Text style={styles.statisticLabel}>Partners</Text>
                        </View>
                        <View style={styles.statisticItem}>
                            <Text style={styles.statisticNumber}>25</Text>
                            <Text style={styles.statisticLabel}>Countries</Text>
                        </View>
                    </View>
                </View>

                {/* Terms & Conditions Section */}
                <View style={styles.termsSection}>
                    <Text style={styles.sectionHeader}>Terms & Conditions</Text>
                    <View style={styles.cardContainer}>
                        <CardButton title="Privacy Policy" link="https://www.app-privacy-policy.com/live.php?token=K98docoE9WLYpQhCzl9tWnm0E51rAmGx" iconName="lock" />
                        <CardButton title="Regulations" link="https://www.app-privacy-policy.com/live.php?token=SNBrkXTYaOSz6rI6vKniCX2ypy96Nu0r" iconName="legal" />
                    </View>
                </View>

                {/* Contact info Section */}
                <View style={styles.contactsSection}>
                    <Text style={styles.sectionHeader}>Contacts</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 17, marginTop: 20, fontWeight: 'bold' }}>Email:</Text>
                        <Text style={{ fontSize: 17, marginTop: 20, fontStyle: 'italic' }}> DriveTime_official@gmail.vn</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Phone:</Text>
                        <Text style={{ fontSize: 17, marginTop: 10, fontStyle: 'italic' }}> (+84) 0123 9999 999</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Address:</Text>
                        <Text style={{ fontSize: 17, marginTop: 10, fontStyle: 'italic' }}> 123 Quoc Street, Dis.1, HCMC</Text>
                    </View>
                </View>

                <Text style={{alignSelf: 'center', marginTop: 40}}>All Rights Reserved @2024</Text>
                <Text style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>DriveTime Inc. 2023</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 20,
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 180,
        resizeMode: 'contain',
        marginTop: 0,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '500',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 15,
    },
    subHeaderText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
    },
    teamSection: {
        marginTop: 20,
    },
    sectionHeader: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '400',
        marginTop: 20,
    },
    sectionText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 10,
        textAlign: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around', // or 'space-around' depending on your preference
    },
    cardItem: {
        marginRight: 20,
    },
    profileContainer: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        width: 200, // Adjust the width as needed
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        alignSelf: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        color: '#555555',
        alignSelf: 'flex-start',
        marginBottom: 3,
    },
    statisticsSection: {
        marginTop: 30,
    },
    statisticsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    statisticItem: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        margin: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
    },
    statisticNumber: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },
    statisticLabel: {
        fontSize: 16,
    },
    termsSection: {
        marginTop: 30,
    },
    contactsSection: {
        marginTop: 20,
    },
    cardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
    icon: {
        width: 17,
        height: 17,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        textDecorationLine: 'underline',
    },
});
