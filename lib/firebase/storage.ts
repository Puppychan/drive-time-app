import { ResponseCode } from "@/common/response-code.enum";
import { ResponseDto } from "@/common/response.dto";
import { storage } from "@/lib/firebase/firebase";

import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function uploadImage(imageUri: any, imageRef: string): Promise<ResponseDto> {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    // const fileRef = ref(storage, `images/user_avatars/${userid}.jpg`);
    const fileRef = ref(storage, imageRef)
    const uploadTask = uploadBytesResumable(fileRef, blob)

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
          return new ResponseDto(ResponseCode.OK, 'Upload successfully', downloadUrl)
        }
        catch (e) {
          throw new Error( 'Cannot get download url: ' + e)
        }
      }
    );
    return new ResponseDto(
      ResponseCode.BAD_GATEWAY,
      'Upload failed'
    )
  }
  catch(error) {
    throw error
  }

}
