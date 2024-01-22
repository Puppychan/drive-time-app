// import React from 'react';
// import { Dimensions, Text, View } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const HomeScreen = () => {
//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//             {
//                 data: [20, 45, 28, 80, 99, 43],
//                 strokeWidth: 2,
//             },
//         ],
//     };

//     return (
//         <View className='flex-1 p-5'>
//             <Text className='text-2xl mb-5'>Admin Dashboard</Text>
//             <Text className='text-lg mb-5'>Income Statistics</Text>
//             <LineChart
//                 data={data}
//                 width={Dimensions.get('window').width - 30}
//                 height={220}
//                 chartConfig={{
//                     backgroundColor: '#e26a00',
//                     backgroundGradientFrom: '#fb8c00',
//                     backgroundGradientTo: '#ffa726',
//                     decimalPlaces: 2,
//                     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                     style: {
//                         borderRadius: 16,
//                     },
//                 }}
//                 bezier
//                 className='my-2 rounded-lg'
//             />
//         </View>
//     );
// };

// export default HomeScreen;