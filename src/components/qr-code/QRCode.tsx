// import React, { useState, useEffect } from 'react'
// // other imports remain the same

// export function MyComponent({ userId }) {
//   const [qrCodeUri, setQrCodeUri] = useState(null)
//   const qrRef = createRef<View>()

//   useEffect(() => {
//     if (userId && qrRef.current) {
//       captureRef(qrRef, {
//         format: 'png',
//         quality: 1
//       })
//         .then(setQrCodeUri)
//         .catch(console.error)
//     }
//   }, [userId, qrRef])

//   // Render QR code component
//   return (
//     <View style={{ position: 'absolute', left: -1000, top: -1000 }}>
//       <View ref={qrRef} style={{ width: 200, height: 200 }}>
//         <QRCode value={userId} size={200} />
//       </View>
//     </View>
//   )
// }
