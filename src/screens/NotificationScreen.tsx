import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { firestore } from 'path-to-your-firebase-config';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('notifications')
      .onSnapshot(snapshot => {
        const fetchedNotifications = snapshot.docs.map(doc => doc.data());
        setNotifications(fetchedNotifications);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

export default NotificationsScreen;
