import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    userProfileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden'
    },
    userNameTxt: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    userRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userRatingTxt: {
        fontSize: 20
    },
    ratingImg: {
        height: 20,
        width: 20,
        resizeMode: 'cover'
    }
})
