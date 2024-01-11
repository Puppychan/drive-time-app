import { ResponseCode } from "@/common/response-code.enum";
import { ResponseDto } from "@/common/response.dto";
import { storage } from "@/lib/firebase/firebase";

import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function uploadImage(imageUri: any, imageRef: string): Promise<ResponseDto> {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  // const fileRef = ref(storage, `images/user_avatars/${userid}.jpg`);
  const fileRef = ref(storage, imageRef);
  const uploadTask = uploadBytesResumable(fileRef, blob);

  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          return new ResponseDto(
            ResponseCode.BAD_REQUEST,
            'Upload paused'
          )
        default:
          break;
          
      }
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          return new ResponseDto(
            ResponseCode.UNAUTHORIZED,
            'Upload failed. Unauthorized'
          )

        case 'storage/canceled':
          return new ResponseDto(
            ResponseCode.BAD_REQUEST,
            'Upload canceled'
          )
        
        default:
          return new ResponseDto(
            ResponseCode.BAD_GATEWAY,
            'Upload failed: ' + error.message
          )
      }
      
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadUrl) => {
        return new ResponseDto(
          ResponseCode.OK,
          'Upload successfully',
          downloadUrl
        )
      })
      .catch((e) => {
        return new ResponseDto(
          ResponseCode.BAD_GATEWAY,
          'Cannot get download url: ' + e
        )
      })
    }
  );
  return new ResponseDto(
    ResponseCode.BAD_GATEWAY,
    'Something went wrong. Please try again'
  );
}
