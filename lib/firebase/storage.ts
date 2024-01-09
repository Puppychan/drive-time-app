import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastAndroid } from 'react-native'

import { storage } from '@/lib/firebase/firebase'

export async function uploadImage(imageUri: any, imageRef: string) {
  const response = await fetch(imageUri)
  const blob = await response.blob()
  // const fileRef = ref(storage, `images/user_avatars/${userid}.jpg`);
  const fileRef = ref(storage, imageRef)
  const uploadTask = uploadBytesResumable(fileRef, blob)

  let imgDownloadUrl: string | undefined

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          ToastAndroid.show('Upload paused', ToastAndroid.SHORT)
          break
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          ToastAndroid.show('Upload failed, unthorized', ToastAndroid.SHORT)
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          ToastAndroid.show('Upload canceled', ToastAndroid.SHORT)
          break
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          ToastAndroid.show('Upload failed, unknow error', ToastAndroid.SHORT)
          break
      }
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) => {
          imgDownloadUrl = downloadUrl
        })
        .catch((e) => {
          console.log('Error when get download url', e)
          throw e
        })
    }
  )
  return imgDownloadUrl
}
