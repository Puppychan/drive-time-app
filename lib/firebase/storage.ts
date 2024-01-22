import { ResponseCode } from "@/common/response-code.enum";
import { ResponseDto } from "@/common/response.dto";
import { storage } from "@/lib/firebase/firebase";

import {ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";

export async function uploadImage(imageUri: any, imageRef: string) {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const fileRef = ref(storage, imageRef)

    const snapshot = await uploadBytes(fileRef, blob)
    console.log('Uploaded image!');
  }
  catch(e)  {
    throw e
  }
}

export async function getDownloadUrl(imageRef: string): Promise<ResponseDto> {
  const fileRef = ref(storage, imageRef)
  return getDownloadURL(fileRef)
  .then((downloadURL) => {
    console.log('File available at', downloadURL);
    return new ResponseDto(ResponseCode.OK, 'Upload successfully', downloadURL)
  })
  .catch(error => {
    throw error
  })
}